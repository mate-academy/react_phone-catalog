import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../shared/utils/searchHelper';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

import { CustomSelect } from '../../shared/components/CustomSelect';
import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../Pagination';
import { Loader } from '../../shared/components/Loader';

function getNumberOfPages(itemsPerPage: number, itemsCount: number) {
  return Math.ceil(itemsCount / itemsPerPage);
}

type Props = {
  goods: Product[];
};

export const ProductList: React.FC<Props> = ({ goods }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleItems, setVisibleItems] = useState(goods);
  const [isLoading, setIsLoading] = useState(false);

  const sort = searchParams.get('sort');
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 'all';

  function setSearchWith(params: SearchParams) {
    const updatedParams = { ...params };

    if (updatedParams.perPage === 'all') {
      updatedParams.perPage = null;
    }

    if (updatedParams.page === '1') {
      updatedParams.perPage = null;
    }

    const search = getSearchWith(searchParams, updatedParams);

    setSearchParams(search, { replace: true });
  }

  const numberOfPages = useMemo(() => {
    return perPage === 'all' ? 1 : getNumberOfPages(+perPage, goods.length);
  }, [perPage, goods.length]);

  useEffect(() => {
    if (!sort) {
      setSearchWith({ sort: 'newest' });
    }
  }, []);

  const firstIndex = (+page - 1) * +perPage;
  const lastIndex = Math.min(+page * +perPage, goods.length);

  useEffect(() => {
    setVisibleItems(
      perPage === 'all' ? goods : goods.slice(firstIndex, lastIndex),
    );
  }, [firstIndex, lastIndex, perPage, goods]);

  const handleSelectChange = (value: string, type: string) => {
    setIsLoading(true);
    setSearchWith({ [type]: value });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className={styles.productList}>
      <div className={styles.filter__wrapper}>
        <div className={styles.filter__option}>
          <p>Sort by</p>

          <CustomSelect
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'alphabetically', label: 'Alphabetically' },
              { value: 'cheapest', label: 'Cheapest' },
            ]}
            value={sort || 'newest'}
            onChange={value => handleSelectChange(value, 'sort')}
          />
        </div>
        <div className={styles.filter__option}>
          <p>Items on page</p>
          <CustomSelect
            options={[
              { value: '4', label: '4' },
              { value: '8', label: '8' },
              { value: '16', label: '16' },
              { value: 'all', label: 'All' },
            ]}
            value={perPage}
            onChange={value => handleSelectChange(value, 'perPage')}
          />
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.itemsList}>
          {visibleItems.map(item => (
            <ProductCard key={item.itemId} product={item} />
          ))}
        </div>
      )}
      {perPage && !isLoading && numberOfPages > 1 && (
        <div className={styles.pagination}>
          <Pagination numberOfPages={numberOfPages} />
        </div>
      )}
    </section>
  );
};
