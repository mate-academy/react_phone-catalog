import './searchList.scss';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { NoSearchResult } from '../NoSearchResult';
import { ProductsList } from '../ProductsList';

import { Product } from '../../type/product';

type Props = {
  products: Product[],
};

export const SearchList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  const getSearchProducts = useCallback(() => {
    const searchQuery = getQuerySearchParam();

    if (!searchQuery) {
      return [];
    }

    return [...products].filter((item) => (
      item.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchParams]);

  return getSearchProducts().length > 0 ? (
    <section className="search-list">
      <p className="search-list__number">
        {`${getSearchProducts().length} results`}
      </p>

      <ProductsList products={getSearchProducts()} />
    </section>
  ) : (
    <NoSearchResult />
  );
};
