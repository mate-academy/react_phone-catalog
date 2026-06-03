export const getAssetPath = (path: string) => {
  if (!path || path.startsWith('http')) {
    return path;
  }

  const normalizedBase = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.replace(/^\//, '');

  return `${normalizedBase}/${normalizedPath}`;
};
