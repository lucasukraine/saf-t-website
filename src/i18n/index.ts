// i18n — the site has two locales: Ukrainian (default, at the root) and
// English (under /en/). Blog articles are Ukrainian-only by decision; the
// English side has its own /en/blog/ page that says so and links to them.

export type Lang = 'uk' | 'en';

export const EN_PREFIX = '/en';

/** Locale of a page, derived from its URL — components need no prop. */
export function getLang(url: URL): Lang {
  return url.pathname === EN_PREFIX || url.pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'uk';
}

/** Root of the locale: '/' or '/en/'. */
export function homePath(lang: Lang): string {
  return lang === 'en' ? `${EN_PREFIX}/` : '/';
}

/** Blog index of the locale: '/blog/' or '/en/blog/'. */
export function blogPath(lang: Lang): string {
  return lang === 'en' ? `${EN_PREFIX}/blog/` : '/blog/';
}

/** Pages that exist in both languages and are true counterparts (hreflang pairs). */
const PAIRS: Array<Record<Lang, string>> = [
  { uk: '/', en: `${EN_PREFIX}/` },
  { uk: '/blog/', en: `${EN_PREFIX}/blog/` },
];

const withSlash = (p: string) => (p.endsWith('/') ? p : `${p}/`);

/** hreflang counterparts of a path, or null if the page exists in one language only. */
export function alternatesFor(pathname: string): Record<Lang, string> | null {
  const p = withSlash(pathname);
  return PAIRS.find((pair) => pair.uk === p || pair.en === p) ?? null;
}

/**
 * Where the language switcher leads. Counterpart pages map 1:1; a Ukrainian
 * article has no English version, so the switcher leads to /en/blog/, which
 * explains that the articles are in Ukrainian.
 */
export function switchTarget(pathname: string, to: Lang): string {
  const alt = alternatesFor(pathname);
  if (alt) return alt[to];
  if (to === 'en') return withSlash(pathname).startsWith('/blog/') ? blogPath('en') : homePath('en');
  return homePath('uk');
}

export const htmlLang: Record<Lang, string> = { uk: 'uk', en: 'en' };
export const ogLocale: Record<Lang, string> = { uk: 'uk_UA', en: 'en_US' };
export const dateLocale: Record<Lang, string> = { uk: 'uk-UA', en: 'en-US' };
