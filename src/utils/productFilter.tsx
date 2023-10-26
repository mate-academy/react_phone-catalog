import { Product } from '../types/Product';

export const filterProducts = (
  products: Product[],
  sortType: string | null,
): Product[] => {
  const preparedProducts = [...products];

  if (sortType) {
    preparedProducts.sort((product1, product2) => {
      switch (sortType) {
        case 'name':
          return product1.name.localeCompare(product2.name);

        case 'price':
          return product1.price - product2.price;

        case 'age':
          return product2.year - product1.year;

        default:
          return 0;
      }
    });
  }

  return preparedProducts;
};
