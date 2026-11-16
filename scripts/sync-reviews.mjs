import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const API_KEY = process.env.PLACES_API_KEY;
if (!API_KEY) {
  console.error('PLACES_API_KEY is not set');
  process.exit(1);
}

const PLACE_ID = 'ChIJ05L3RrSjoRQRHNBesI12VEA';
const MAX_LEN = 450;
const DRY = process.argv.includes('--dry-run');

async function placesApi(path, opts = {}) {
  const res = await fetch(`https://places.googleapis.com/v1${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translateOfficial(text, target) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(API_KEY)}&format=text`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text, target }),
        }
      );
      if (res.status === 429) { await sleep(1500 * attempt); continue; }
      if (!res.ok) return null;
      const data = await res.json();
      return data?.data?.translations?.[0]?.translatedText || null;
    } catch {
      await sleep(1500 * attempt);
    }
  }
  return null;
}

async function translateGtx(text, target) {
  // Το gtx επιστρέφει συχνά 429 από CI runners — γι' αυτό backoff και όριο 3 προσπαθειών.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      if (res.status === 429) { await sleep(2000 * attempt); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const out = (data?.[0] || []).map((seg) => seg?.[0] || '').join('');
      if (out && out !== text) return out;
      return null;
    } catch (e) {
      if (attempt < 3) await sleep(2000 * attempt);
      else console.warn(`gtx μετάφραση απέτυχε (${target}):`, e.message);
    }
  }
  return null;
}

async function translate(text, target) {
  return (await translateOfficial(text, target)) || (await translateGtx(text, target));
}

function trim(text) {
  if (text.length <= MAX_LEN) return text;
  const cut = text.slice(0, MAX_LEN);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 200 ? cut.slice(0, lastSpace) : cut) + '…';
}

// Quoted string (single ή double quotes, με escapes)
const QSTR = String.raw`(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`;

function updateBlock(src, idx, name, text) {
  // Indentation-agnostic: το el.ts χρησιμοποιεί 6 spaces, το en.ts 1 space.
  const re = new RegExp(
    String.raw`(\n[ \t]*)testimonial${idx}:\s*\{[\s\S]*?name:\s*` + QSTR +
    String.raw`,\s*text:\s*` + QSTR + String.raw`\s*\}`
  );
  const m = src.match(re);
  if (!m) throw new Error(`testimonial${idx} block not found`);

  const prefix = m[1];                       // "\n" + indentation
  const indent1 = prefix.replace(/^\n/, '');
  const indent2 = indent1 + '  ';
  const replacement =
    `${prefix}testimonial${idx}: {\n` +
    `${indent2}name: ${JSON.stringify(name)},\n` +
    `${indent2}text: ${JSON.stringify(text)}\n` +
    `${indent1}}`;

  return src.replace(re, replacement);
}

function replaceSingle(src, pattern, replacement) {
  const re = new RegExp(pattern);
  if (!re.test(src)) throw new Error(`Pattern not found: ${pattern}`);
  return src.replace(re, replacement);
}

async function main() {
  const headers = new Headers();
  headers.set('X-Goog-FieldMask', 'displayName,rating,userRatingCount,reviews');
  const full = await placesApi(`/places/${PLACE_ID}`, { headers: Object.fromEntries(headers) });

  const rating = full.rating;
  const count = full.userRatingCount;
  const reviews = (full.reviews || [])
    .map((r) => ({
      name: r.authorAttribution?.displayName || 'Πελάτης',
      text: r.originalText?.text || r.text?.text || '',
      lang: (r.originalText?.languageCode || '').toLowerCase(),
      time: new Date(r.publishTime || 0).getTime(),
    }))
    .filter((r) => r.text)
    .sort((a, b) => b.time - a.time)
    .slice(0, 3);

  if (reviews.length < 3) {
    console.error('Λιγότερες από 3 κριτικές');
    process.exit(1);
  }
  console.log('Τελευταίες 3 κριτικές:', reviews.map((r) => r.name).join(', '));

  const results = [];
  for (const r of reviews) {
    let el = null;
    let en = null;
    if (r.lang.startsWith('el')) {
      el = trim(r.text);
      en = await translate(r.text, 'en');
      if (en) en = trim(en);
    } else if (r.lang.startsWith('en')) {
      en = trim(r.text);
      el = await translate(r.text, 'el');
      if (el) el = trim(el);
    } else {
      el = await translate(r.text, 'el');
      if (el) el = trim(el);
      en = await translate(r.text, 'en');
      if (en) en = trim(en);
    }
    results.push({ name: r.name, el, en, lang: r.lang });
  }

  let changed = false;

  for (const [file, lang] of [
    ['src/i18n/locales/el.ts', 'el'],
    ['src/i18n/locales/en.ts', 'en'],
  ]) {
    const path = join(root, file);
    const before = readFileSync(path, 'utf8');
    let src = before;

    src = replaceSingle(
      src,
      `(count: ')[^']*(')`,
      `$1${lang === 'el' ? `Βασισμένο σε ${count}+ αξιολογήσεις Google` : `Based on ${count}+ Google reviews`}$2`
    );

    src = replaceSingle(src, `(rating: ')[^']*(')`, `$1${rating.toFixed(1)} / 5$2`);

    let missing = 0;
    for (let i = 0; i < 3; i++) {
      if (results[i][lang]) {
        src = updateBlock(src, i + 1, results[i].name, results[i][lang]);
      } else {
        missing++;
        console.warn(`⚠ ${file}: κριτική #${i + 1} (${results[i].name}) χωρίς μετάφραση — διατηρείται το υπάρχον κείμενο.`);
      }
    }
    if (missing > 0) console.warn(`⚠ ${file}: ${missing} κριτική(ές) χωρίς μετάφραση (κρατήθηκαν τα υπάρχοντα κείμενα).`);

    if (src !== before) {
      if (DRY) console.log(`(dry-run) θα ενημερωνόταν: ${file}`);
      else { writeFileSync(path, src); console.log(`✓ Ενημερώθηκε: ${file}`); }
      changed = true;
    } else {
      console.log(`– Χωρίς αλλαγές: ${file}`);
    }
  }

  if (!changed) console.log('Καμία νέα αλλαγή — skip commit.');
  process.exit(0);
}

main().catch((e) => {
  console.error('ΣΦΑΛΜΑ:', e.message);
  process.exit(1);
});
