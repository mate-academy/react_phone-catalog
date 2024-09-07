import { TProduct } from 'utils/types/product.type';

export const filterByCategory = (products: TProduct[], text: string) =>
  products.filter(product => product.category === text);
