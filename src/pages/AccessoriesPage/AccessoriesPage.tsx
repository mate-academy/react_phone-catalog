import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination';
import { ProductsListSkeleton } from '../../components/Skeletons';
import styles from './AccessoriesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getPublicUrl } from '../../utils/getPublicUrl';
import { formatModelCount } from '../../utils/formatModelCount';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  useEffect(() => {
    fetch(getPublicUrl('/api/products.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((products: Product[]) => {
        const accessoriesProducts = products.filter(
          product => product.category === 'accessories',
        );

        setAccessories(accessoriesProducts);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredAccessories = accessories.filter(accessory =>
    accessory.name.toLowerCase().includes(query),
  );

  const sortedAccessories = [...filteredAccessories].sort(
    (accessory1, accessory2) => {
      switch (sort) {
        case 'title':
          return accessory1.name.localeCompare(accessory2.name);

        case 'price':
          return accessory1.price - accessory2.price;

        case 'age':
        default:
          return accessory2.year - accessory1.year;
      }
    },
  );

  const startIndex = (page - 1) * Number(perPage);
  const endIndex = page * Number(perPage);

  const visibleAccessories =
    perPage === 'all'
      ? sortedAccessories
      : sortedAccessories.slice(startIndex, endIndex);

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
      <Breadcrumbs currentPage="Accessories" />

      <h1 className={styles.title}>Accessories</h1>

      <p className={styles.count}>
        {isLoading
          ? 'Loading models...'
          : formatModelCount(filteredAccessories.length)}
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
      ) : accessories.length === 0 ? (
        <p>There are no accessories yet</p>
      ) : filteredAccessories.length === 0 ? (
        <p>There are no accessories matching the query</p>
      ) : (
        <>
          <ProductsList products={visibleAccessories} />

          {perPage !== 'all' && (
            <Pagination
              total={sortedAccessories.length}
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
