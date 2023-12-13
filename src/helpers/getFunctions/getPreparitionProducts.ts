import { Product } from '../../types/Product';
import { Sort } from '../../types/Sort';

export const getPreparitionProducts = (
  products: Product[],
  searchParams: URLSearchParams,
) => {
  const sort = (searchParams.get('sort') as Sort) || 'age';
  const query = searchParams.get('query') || '';

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
      .filter(product => (
        product.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim())
      ))

  );
};
