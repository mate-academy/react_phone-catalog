export const getAssetUrl = (path: string): string => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
