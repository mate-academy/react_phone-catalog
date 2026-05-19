export const getImageUrl = (path: string) => {
  if (!path) {
    return '';
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `/react_phone-catalog/${cleanPath}`;
};
