export const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL;

  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${base}${cleanPath}`;
};
