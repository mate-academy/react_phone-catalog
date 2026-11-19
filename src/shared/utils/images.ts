export const getBaseUrl = (): string => {
  const base = import.meta.env.BASE_URL;

  return base.endsWith('/') ? base : `${base}/`;
};

export const getImageUrl = (path: string): string => {
  const base = getBaseUrl();

  return `${base}${path.replace(/^\//, '')}`;
};
