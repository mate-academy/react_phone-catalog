import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './TabletsPage.module.scss';
import { Product } from '../../types/product';
import { useSearchParams } from 'react-router-dom';
import { getTablets } from '../../api';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { ProductsSort } from '../shared/components/ProductsSort';
import { ProductsPerPage } from '../shared/components/ProductsPerPage';
import { ProductsList } from '../shared/components/ProductsList';
import { Pagination } from '../shared/components/Pagination';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getTablets()
      .then(setTablets)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTablets = tablets.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedTablets = [...filteredTablets];

  if (sort === 'age') {
    sortedTablets.sort((a, b) => b.year - a.year);
  }

  if (sort === 'title') {
    sortedTablets.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    sortedTablets.sort((a, b) => a.price - b.price);
  }

  const itemsPerPage =
    perPage === 'all' ? sortedTablets.length : Number(perPage);

  const firstIndex = (page - 1) * itemsPerPage;

  const itemsOnPage = sortedTablets.slice(
    firstIndex,
    firstIndex + itemsPerPage,
  );

  const handleSortChange = (sortType: string) => {
    const value = sortType;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sort', value);
      params.set('page', '1');

      return params;
    });
  };

  const handlePerPageChange = (perPageValue: string) => {
    const value = perPageValue;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('perPage', value);
      params.set('page', '1');

      return params;
    });
  };

  const handlePageChange = (p: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(p));

      return params;
    });
  };

  return (
    <div className={styles.tabletspage}>
      <Breadcrumbs
        items={[
          {
            label: 'Tablets',
          },
        ]}
      />

      <h1 className={styles.tabletspage__title}>Tablets</h1>
      <span
        className={styles.tabletspage__counter}
      >{`${tablets.length} models`}</span>

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {tablets.length === 0 && !isLoading && (
        <h4 className={styles.tabletspage__empty}>There are no phones yet</h4>
      )}

      {!isLoading && (
        <div className={styles.tabletspage__settings}>
          <ProductsSort onSelectChange={handleSortChange} />
          <ProductsPerPage onSelectChange={handlePerPageChange} />
        </div>
      )}

      {!itemsOnPage.length && query !== '' && (
        <h4 className={styles.tabletspage__empty}>
          There are no tablets matching the query
        </h4>
      )}

      {tablets.length > 0 && !isLoading && (
        <ProductsList products={itemsOnPage} />
      )}

      {!isLoading && perPage !== 'all' && (
        <Pagination
          total={sortedTablets.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
