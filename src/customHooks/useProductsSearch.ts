import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';

export const useProductsSearch = (products: Product[]): [Product[], string] => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchElements = query.split(' ');

  const visibleProducts = query
    ? products.filter(({ itemId }) => {
      return (
        searchElements.some(element => itemId.includes(element.toLowerCase()))
      );
    })
    : products;

  return [visibleProducts, query];
};
