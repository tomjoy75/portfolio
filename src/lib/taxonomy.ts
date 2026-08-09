/** Shared vocabulary for project metadata. Imported by the content schema and by UI. */

export const DOMAINS = ['systems', 'web', 'infra', 'security', 'ai', 'graphics'] as const;
export const CONTEXTS = ['professional', '42', 'personal'] as const;
export const TEAMS = ['solo', 'team'] as const;
export const DEMO_TYPES = ['wasm', 'embed', 'media', 'diagram', 'none'] as const;

export type Domain = (typeof DOMAINS)[number];
export type DemoType = (typeof DEMO_TYPES)[number];

export const DOMAIN_LABELS: Record<Domain, string> = {
  systems: 'Systems',
  web: 'Web & product',
  infra: 'Infra & cloud',
  security: 'Security',
  ai: 'AI & data',
  graphics: 'Graphics',
};

/**
 * Teal means one thing on this site: you can run it. See DIRECTION.md 4.4.
 * `wasm` and `embed` are runnable; everything else is neutral.
 */
export const RUNNABLE: readonly DemoType[] = ['wasm', 'embed'];

export const DEMO_LABELS: Record<DemoType, string> = {
  wasm: 'Run it here',
  embed: 'Live app',
  media: 'Walkthrough',
  diagram: 'Architecture',
  none: '',
};

export const isRunnable = (type: DemoType) => RUNNABLE.includes(type);

/**
 * Where a demo badge links. One place, so the hero, the featured entry, the
 * catalogue row and the project page all agree.
 *
 * Only `wasm` has an implemented demo today, so only `wasm` gets a destination.
 * Anything else returns undefined and the badge renders inert rather than
 * promising an interaction that does not exist.
 */
export const demoHref = (id: string, type: DemoType): string | undefined =>
  type === 'wasm' ? `/projects/${id}/#demo` : undefined;
