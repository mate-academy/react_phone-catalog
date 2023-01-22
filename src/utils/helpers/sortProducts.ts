import { Product } from 'src/types/Product';

export function sortProducts(
  productsToSort: Product[],
  sortKey: string,
) {
  const callback = (
    product1: Product,
    product2: Product,
  ) => {
    switch (sortKey) {
      case 'name':
        return product1[sortKey].localeCompare(product2[sortKey]);

      case 'price':
        return product1.price - product2.price;

      case 'age':
        return product2.year - product1.year;

      default:
        return 0;
    }
  };

  return productsToSort.sort(callback);
}
