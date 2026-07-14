export const getImageUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const base = import.meta.env.BASE_URL;
  const cleanBaseUrl = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBaseUrl}/${cleanPath}`;
};
