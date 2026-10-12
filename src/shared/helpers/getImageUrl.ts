export const getImageUrl = (image: string) => {
  const cleanPath = image.replace(/^\/+/, '');

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
