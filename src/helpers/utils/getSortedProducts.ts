import { ProductType } from '../types/ProductType';

export enum Sort {
  name = 'name',
  age = 'year',
  price = 'price',
}

export function getSortedProducts(
  products: ProductType[],
  sortBy: Sort,
) {
  const preparedProducts = [...products];

  switch (sortBy) {
    case 'name':
      preparedProducts.sort((a, b) => (
        a[sortBy].localeCompare(b[sortBy])
      ));
      break;

    case 'year':
      preparedProducts.sort((a, b) => b.year - a.year);
      break;

    case 'price':
      preparedProducts.sort((a, b) => a[sortBy] - b[sortBy]);
      break;

    default:
      break;
  }

  return preparedProducts;
}
