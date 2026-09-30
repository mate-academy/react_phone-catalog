export const getNormalizedImagePath = (imagePath: string): string => {
  if (!imagePath) {
    return '';
  }

  const cleanPath = imagePath
    .replace(/^\//, '')
    .replace(/^react_phone-catalog\//, '');

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}${cleanPath}`;
};
