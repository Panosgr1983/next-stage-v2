interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: object[];
}

const DEFAULT_META = {
  title: 'NextStage – Επισκευή Laptop, Desktop & Mac | 24-48h Εξυπηρέτηση',
  description:
    'Επισκευή υπολογιστών, laptop, MacBook και iMac με ανταλλακτικά υψηλής ποιότητας και εγγύηση. 10€ ελάχιστη χρέωση ελέγχου. Προφήτη Ηλία 5, Γαλάτσι. 210 21 16 016.',
  canonical: 'https://nextstage-service.gr/',
  ogTitle: 'NextStage – Επισκευή Laptop, Desktop, Mac & TV',
  ogDescription:
    'Άμεση διάγνωση, ανταλλακτικά υψηλής ποιότητας και εξειδικευμένη τεχνική υποστήριξη για κάθε τύπο υπολογιστή.',
  twitterTitle: 'NextStage – Επισκευή Laptop, Desktop & Mac με Εγγύηση',
  twitterDescription:
    'Άμεση διάγνωση, ανταλλακτικά υψηλής ποιότητας και εξειδικευμένη τεχνική υποστήριξη.',
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function setPageMeta(meta: PageMeta) {
  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertCanonical(meta.canonical);

  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  upsertMeta('property', 'og:title', ogTitle);
  upsertMeta('property', 'og:description', ogDescription);
  upsertMeta('property', 'og:url', meta.canonical);
  upsertMeta('name', 'twitter:title', ogTitle);
  upsertMeta('name', 'twitter:description', ogDescription);

  document.getElementById('dynamic-jsonld')?.remove();
  if (meta.jsonLd && meta.jsonLd.length > 0) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-jsonld';
    script.textContent = JSON.stringify(meta.jsonLd);
    document.head.appendChild(script);
  }
}

export function resetPageMeta() {
  setPageMeta({
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    canonical: DEFAULT_META.canonical,
    ogTitle: DEFAULT_META.ogTitle,
    ogDescription: DEFAULT_META.ogDescription,
  });
  upsertMeta('name', 'twitter:title', DEFAULT_META.twitterTitle);
  upsertMeta('name', 'twitter:description', DEFAULT_META.twitterDescription);
  upsertMeta('property', 'og:url', DEFAULT_META.canonical);
}
