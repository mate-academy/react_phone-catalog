const getNormalizedBase = (): string => {
  const base = import.meta.env.BASE_URL;

  return base.endsWith('/') ? base : `${base}/`;
};

export const BASE_URL = `${getNormalizedBase()}api`;

export const getImageUrl = (path: string): string =>
  `${getNormalizedBase()}${path}`;
