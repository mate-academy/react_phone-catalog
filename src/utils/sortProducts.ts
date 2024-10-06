import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';

export const SortProducts = (products: Product[]) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const newproducts = products.filter(product =>
    product.name.toLocaleLowerCase().includes(query),
  );

  switch (sort) {
    default:
      newproducts.sort((a, b) => {
        if (a.year === b.year) {
          return +a.id - +b.id;
        }

        return b.year - a.year;
      });

      return newproducts;

    case 'alphabetically':
      newproducts.sort((a, b) => a.name.localeCompare(b.name));

      return newproducts;

    case 'cheapest':
      newproducts.sort((a, b) => a.price - b.price);

      return newproducts;
  }
};
