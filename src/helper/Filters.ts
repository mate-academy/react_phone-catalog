import { Product } from './Product';

export function filterByQuery(products: Product[], query: string) {
  const querySplit = query
    .toLowerCase()
    .split(' ')
    .filter(q => q !== '');

  return products.filter(product => {
    const phoneName = product.name.toLowerCase();

    return querySplit.every(part => phoneName.includes(part));
  });
}

export function filterProducts(products: Product[], value: string | null) {
  const sortedProducts = [...products];

  switch (true) {
    case value === 'price':
      return sortedProducts.sort((prodA, prodB) => prodA.price - prodB.price);
    case value === 'age':
      return sortedProducts.sort((prodA, prodB) => prodA.year - prodB.year);
    case value === 'name':
      return sortedProducts.sort((prodA, prodB) =>
        prodA.name.toLowerCase().localeCompare(prodB.name.toLowerCase()),
      );
    default:
      return products;
  }
}
