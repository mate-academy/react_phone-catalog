import { Product } from '../../types/Product';
import { Sort } from '../../types/Sort';

export const getPreparitionProducts = (
  products: Product[],
  searchParams: URLSearchParams,
) => {
  const sort = (searchParams.get('sort') as Sort) || 'age';
  const itemsNumber = searchParams.get('itemsOnPage') || '16';
  const page = searchParams.get('page') || '1';

  const start = (+page - 1) * (+itemsNumber) || 0;
  const end = (+page - 1) * (+itemsNumber) + (+itemsNumber) || 0;

  return (
    products.sort((productFirst, productSecond) => {
      if (sort === 'name') {
        return productFirst[sort].localeCompare(productSecond[sort]);
      }

      if (sort === 'year') {
        return productSecond[sort] - productFirst[sort];
      }

      return productFirst[sort] - productSecond[sort];
    })
      .slice(start, end)
  );
};
