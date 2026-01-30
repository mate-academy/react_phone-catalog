export const getImageUrl = (imagePath: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = imagePath.startsWith('/')
    ? imagePath.slice(1)
    : imagePath;

  return `${normalizedBase}${normalizedPath}`;
};
