export const getCorrectImageUrl = (url: string) => {
  return `img/products/${url.split('/').pop()}`;
};
