import { Product } from '../../type/Product';

export function SortProducts(products: Product[], sort: string, query: string) {
  let sortedProducts = [];

  switch (sort) {
    case 'age':
      sortedProducts = [...products].sort(
        (productA, productB) => productA.age - productB.age,
      );
      break;

    case 'name':
      sortedProducts = [...products].sort(
        (productA, productB) => productA.name.localeCompare(productB.name),
      );
      break;

    case 'price':
      sortedProducts = [...products].sort(
        (productA, productB) => {
          const absoluteDiscountA = productA.price - (
            productA.price * productA.discount) / 100;
          const absoluteDiscountB = productB.price - (
            productB.price * productB.discount) / 100;

          return absoluteDiscountA - absoluteDiscountB;
        },
      );
      break;

    default:
      sortedProducts = products;
  }

  if (query) {
    sortedProducts = sortedProducts.filter(
      product => product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return sortedProducts;
}
