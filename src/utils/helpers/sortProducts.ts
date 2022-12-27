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
        return (product1.priceAfterDiscount || product1[sortKey])
        - (product2.priceAfterDiscount || product2[sortKey]);

      case 'age':
        return product1[sortKey] - product2[sortKey];

      default:
        return 0;
    }
  };

  return productsToSort.sort(callback);
}
