const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const assetUrl = (path: string): string =>
  `${BASE}/${path.replace(/^\/+/, '')}`;
