import { Product } from '../../shared/types/Product';
import { SortParams } from '../types/SortParams';

export function getVisibleProducts(
  products: Product[],
  sortBy: SortParams,
  perPage: string,
  page: string,
) {
  const sortedProducts = [...products].sort((product1, product2) => {
    switch (sortBy) {
      case 'age':
        return product2.year - product1.year;

      case 'price':
        return product1.price - product2.price;

      case 'title':
        return product1.name.localeCompare(product2.name);
    }
  });

  let visibleProducts = [...sortedProducts];

  if (perPage !== 'all') {
    const startFrom = +perPage * (+page - 1);

    visibleProducts = [...visibleProducts].splice(startFrom, +perPage);
  }

  return visibleProducts;
}
