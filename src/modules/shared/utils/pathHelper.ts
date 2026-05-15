export const getPublicPath = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL;

  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
};
