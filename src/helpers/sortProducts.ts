import { Product } from '../types/Product';

export const sortProducts = (
  products: Product[],
  sort: string,
): Product[] => {
  if (sort) {
    return [...products].sort((firstProduct, secondProduct) => {
      switch (sort) {
        case 'age':
          return secondProduct.year - firstProduct.year;
        case 'name':
          return firstProduct.name.localeCompare(secondProduct.name);
        case 'price':
          return firstProduct.price - secondProduct.price;

        default:
          return 0;
      }
    });
  }

  return products;
};
