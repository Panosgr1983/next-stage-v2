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

async function translate(text, target) {
  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(API_KEY)}&format=text`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target }),
      }
    );
    const data = await res.json();
    const out = data?.data?.translations?.[0]?.translatedText;
    return out && out !== text ? out : null;
  } catch (e) {
    console.warn(`Μετάφραση απέτυχε (${target}):`, e.message);
    return null;
  }
}

function trim(text) {
  if (text.length <= MAX_LEN) return text;
  const cut = text.slice(0, MAX_LEN);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 200 ? cut.slice(0, lastSpace) : cut) + '…';
}

function localizedText(review, lang) {
  const original = review.originalText?.text || review.text?.text || '';
  const originalLang = (review.originalText?.languageCode || '').toLowerCase();
  if (originalLang.startsWith(lang)) return original;
  return null;
}

function updateBlock(src, idx, name, text) {
  const re = new RegExp(
    `(testimonial${idx}: \\{\\n      name: )[\\s\\S]*?(,\\n      text: )[\\s\\S]*?(\\n    \\})`
  );
  if (!re.test(src)) {
    throw new Error(`testimonial${idx} block not found`);
  }
  return src.replace(
    re,
    `$1${JSON.stringify(name)}$2${JSON.stringify(text)}$3`
  );
}

function replaceSingle(src, pattern, replacement) {
  const re = new RegExp(pattern);
  if (!re.test(src)) {
    throw new Error(`Pattern not found: ${pattern}`);
  }
  return src.replace(re, replacement);
}

async function main() {
  const headers = new Headers();
  headers.set('X-Goog-FieldMask', 'displayName,rating,userRatingCount,reviews');
  const full = await placesApi(`/places/${PLACE_ID}`, {
    headers: Object.fromEntries(headers),
  });

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
    const el = r.lang.startsWith('el')
      ? r.text
      : (await translate(r.text, 'el')) || r.text;
    const en = r.lang.startsWith('en')
      ? r.text
      : (await translate(r.text, 'en')) || r.text;
    results.push({
      name: r.name,
      el: trim(el),
      en: trim(en),
    });
  }

  let changed = false;

  for (const [file, lang] of [
    ['src/i18n/locales/el.ts', 'el'],
    ['src/i18n/locales/en.ts', 'en'],
  ]) {
    const path = join(root, file);
    let src = readFileSync(path, 'utf8');

    src = replaceSingle(
      src,
      `(count: ')[^']*(')`,
      `$1${lang === 'el' ? `Βασισμένο σε ${count}+ αξιολογήσεις Google` : `Based on ${count}+ Google reviews`}$2`
    );

    src = replaceSingle(
      src,
      `(rating: ')[^']*(')`,
      `$1${rating.toFixed(1)} / 5$2`
    );

    for (let i = 0; i < 3; i++) {
      src = updateBlock(src, i + 1, results[i].name, results[i][lang]);
    }

    if (src !== readFileSync(path, 'utf8')) {
      writeFileSync(path, src);
      console.log(`✓ Ενημερώθηκε: ${file}`);
      changed = true;
    } else {
      console.log(`– Χωρίς αλλαγές: ${file}`);
    }
  }

  if (!changed) {
    console.log('Καμία νέα αλλαγή — skip commit.');
    process.exit(0);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error('ΣΦΑΛΜΑ:', e.message);
  process.exit(1);
});
