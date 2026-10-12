export const getImageUrl = (image: string) => {
  const baseUrl = import.meta.env.BASE_URL;

  return `${baseUrl.replace(/\/+$/, '')}/${image.replace(/^\/+/, '')}`;
};
