export const getImagePath = (relativePath: string) => {
  if (!relativePath) {
    return '';
  }

  const cleanPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath;

  return `/react_phone-catalog/${cleanPath}`;
};
