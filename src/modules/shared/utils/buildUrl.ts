const BASE_URL = import.meta.env.BASE_URL;

export const buildUrl = (path: string): string => {
  const safeBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

  return `${safeBase}${path}`;
};
