import { useEffect, useState } from 'react';
import styles from './AccessoriesPage.module.scss';
import { Product } from '../../types/product';
import { useSearchParams } from 'react-router-dom';
import { getAccessories } from '../../api';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { ProductsSort } from '../shared/components/ProductsSort';
import { ProductsPerPage } from '../shared/components/ProductsPerPage';
import { ProductsList } from '../shared/components/ProductsList';
import { Pagination } from '../shared/components/Pagination';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
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

    getAccessories()
      .then(setAccessories)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredAccessories = accessories.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedAccessories = [...filteredAccessories];

  if (sort === 'age') {
    sortedAccessories.sort((a, b) => b.year - a.year);
  }

  if (sort === 'title') {
    sortedAccessories.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    sortedAccessories.sort((a, b) => a.price - b.price);
  }

  const itemsPerPage =
    perPage === 'all' ? sortedAccessories.length : Number(perPage);

  const firstIndex = (page - 1) * itemsPerPage;

  const itemsOnPage = sortedAccessories.slice(
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
    <div className={styles.accessoriespage}>
      <Breadcrumbs
        items={[
          {
            label: 'Accessories',
          },
        ]}
      />

      <h1 className={styles.accessoriespage__title}>Mobile phones</h1>
      <span
        className={styles.accessoriespage__counter}
      >{`${accessories.length} models`}</span>

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {accessories.length === 0 && !isLoading && (
        <h4 className={styles.accessoriespage__empty}>
          There are no phones yet
        </h4>
      )}

      {!isLoading && (
        <div className={styles.accessoriespage__settings}>
          <ProductsSort onSelectChange={handleSortChange} />
          <ProductsPerPage onSelectChange={handlePerPageChange} />
        </div>
      )}

      {!itemsOnPage.length && query !== '' && (
        <h4 className={styles.accessoriespage__empty}>
          There are no accessories matching the query
        </h4>
      )}

      {accessories.length > 0 && !isLoading && (
        <ProductsList products={itemsOnPage} />
      )}

      {!isLoading && perPage !== 'all' && (
        <Pagination
          total={sortedAccessories.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
