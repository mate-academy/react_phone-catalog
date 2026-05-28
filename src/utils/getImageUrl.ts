export const getImageUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}${cleanPath}`;
};
