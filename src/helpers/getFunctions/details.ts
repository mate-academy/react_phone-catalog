import { DetailType } from '../types/DetailType';

export const getImgUrl = (product: DetailType) => {
  return product.images[0]
    .slice(product.images[0]
      .indexOf('/'), product.images[0]
      .lastIndexOf('/'));
};

export const getProductImages = (length: number, part: string) => {
  return Array.from(Array(length).keys()).map(num => `../api${part}/0${num}.jpg`);
};
