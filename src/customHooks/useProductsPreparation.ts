import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';

export const useProductsPreparation = (
  products: Product[],
): {
  visibleProducts: Product[],
  totalVisibleProducts: number,
  query: string,
  onPage: number,
  page: number,
} => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchElements = query.split(' ');
  const sortBy = searchParams.get('sortBy') || '';
  const onPage = +(searchParams.get('onPage') || 0);
  const page = +(searchParams.get('page') || 1);

  let visibleProducts = [...products];

  if (query) {
    visibleProducts = visibleProducts.filter(({ itemId }) => {
      return (
        searchElements.every(element => itemId.includes(element.toLowerCase()))
      );
    });
  }

  if (sortBy) {
    visibleProducts = visibleProducts.sort((a, b) => {
      switch (sortBy) {
        case 'age':
          return b.year - a.year;
        case 'price':
          return a.fullPrice - b.fullPrice;
        case 'name':
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });
  }

  const totalVisibleProducts = visibleProducts.length;

  if (onPage) {
    const start = onPage * (page - 1);
    const finish = start + onPage;

    visibleProducts = visibleProducts.slice(start, finish);
  }

  return {
    visibleProducts,
    totalVisibleProducts,
    query,
    onPage: onPage || totalVisibleProducts,
    page,
  };
};
