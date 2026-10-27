export const imagePath = (path: string): string => {
  const cleanPath = path.replace(/^\/+/, '');

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
