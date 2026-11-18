import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination';
import { ProductsListSkeleton } from '../../components/Skeletons';
import styles from './PhonesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getPublicUrl } from '../../utils/getPublicUrl';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    fetch(getPublicUrl('/api/products.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((products: Product[]) => {
        const phoneProducts = products.filter(
          product => product.category === 'phones',
        );

        setPhones(phoneProducts);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortedPhones = [...phones].sort((phone1, phone2) => {
    switch (sort) {
      case 'title':
        return phone1.name.localeCompare(phone2.name);

      case 'price':
        return phone1.price - phone2.price;

      case 'age':
      default:
        return phone2.year - phone1.year;
    }
  });

  const startIndex = (page - 1) * Number(perPage);
  const endIndex = page * Number(perPage);

  const visiblePhones =
    perPage === 'all' ? sortedPhones : sortedPhones.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setSearchParams(params => {
      const newParams = new URLSearchParams(params);

      if (newPage === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', String(newPage));
      }

      return newParams;
    });
  };

  return (
    <main className={styles.main}>
      <Breadcrumbs currentPage="Phones" />

      <h1 className={styles.title}>Mobile phones</h1>

      <p className={styles.count}>
        {isLoading ? 'Loading models...' : `${phones.length} models`}
      </p>
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>Sort by</span>

          <select
            className={styles.select}
            value={sort}
            onChange={event => {
              const newSort = event.target.value;

              setSearchParams(params => {
                const newParams = new URLSearchParams(params);

                newParams.set('sort', newSort);
                newParams.delete('page');

                return newParams;
              });
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>

        <label className={styles.control}>
          <span className={styles.label}>Items on page</span>

          <select
            className={styles.perPageSelect}
            value={perPage}
            onChange={event => {
              const newPerPage = event.target.value;

              setSearchParams(params => {
                const newParams = new URLSearchParams(params);

                if (newPerPage === 'all') {
                  newParams.delete('perPage');
                } else {
                  newParams.set('perPage', newPerPage);
                }

                newParams.delete('page');

                return newParams;
              });
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <ProductsListSkeleton count={perPage === '4' ? 4 : 8} />
      ) : hasError ? (
        <div>
          <p>Something went wrong</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      ) : phones.length === 0 ? (
        <p>There are no phones yet</p>
      ) : (
        <>
          <ProductsList products={visiblePhones} />

          {perPage !== 'all' && (
            <Pagination
              total={sortedPhones.length}
              perPage={Number(perPage)}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
};
