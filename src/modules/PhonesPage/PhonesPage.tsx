import styles from './PhonesPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { getPhones } from '../../api';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { ProductsSort } from '../shared/components/ProductsSort';
import { ProductsPerPage } from '../shared/components/ProductsPerPage';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
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

    getPhones()
      .then(setPhones)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPhones = phones.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedPhones = [...filteredPhones];

  if (sort === 'age') {
    sortedPhones.sort((a, b) => b.year - a.year);
  }

  if (sort === 'title') {
    sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    sortedPhones.sort((a, b) => a.price - b.price);
  }

  const itemsPerPage =
    perPage === 'all' ? sortedPhones.length : Number(perPage);

  const firstIndex = (page - 1) * itemsPerPage;

  const itemsOnPage = sortedPhones.slice(firstIndex, firstIndex + itemsPerPage);

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
    <div className={styles.phonespage}>
      <Breadcrumbs
        items={[
          {
            label: 'Phones',
          },
        ]}
      />

      <h1 className={styles.phonespage__title}>Mobile phones</h1>
      <span
        className={styles.phonespage__counter}
      >{`${phones.length} models`}</span>

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {phones.length === 0 && !isLoading && (
        <h4 className={styles.phonespage__empty}>There are no phones yet</h4>
      )}

      {!isLoading && !error && (
        <div className={styles.phonespage__settings}>
          <ProductsSort onSelectChange={handleSortChange} />
          <ProductsPerPage onSelectChange={handlePerPageChange} />
        </div>
      )}

      {!itemsOnPage.length && query !== '' && (
        <h4 className={styles.phonespage__empty}>
          There are no phones matching the query
        </h4>
      )}

      {phones.length > 0 && !isLoading && (
        <ProductsList products={itemsOnPage} />
      )}

      {!isLoading && perPage !== 'all' && (
        <Pagination
          total={sortedPhones.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
