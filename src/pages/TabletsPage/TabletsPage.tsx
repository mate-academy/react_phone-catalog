import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination';
import { ProductsListSkeleton } from '../../components/Skeletons';
import styles from './TabletsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getPublicUrl } from '../../utils/getPublicUrl';
import { formatModelCount } from '../../utils/formatModelCount';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
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
        const tabletProducts = products.filter(
          product => product.category === 'tablets',
        );

        setTablets(tabletProducts);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTablets = tablets.filter(tablet =>
    tablet.name.toLowerCase().includes(query),
  );

  const sortedTablets = [...filteredTablets].sort((tablet1, tablet2) => {
    switch (sort) {
      case 'title':
        return tablet1.name.localeCompare(tablet2.name);

      case 'price':
        return tablet1.price - tablet2.price;

      case 'age':
      default:
        return tablet2.year - tablet1.year;
    }
  });

  const startIndex = (page - 1) * Number(perPage);
  const endIndex = page * Number(perPage);

  const visibleTablets =
    perPage === 'all'
      ? sortedTablets
      : sortedTablets.slice(startIndex, endIndex);

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
      <Breadcrumbs currentPage="Tablets" />

      <h1 className={styles.title}>Tablets</h1>

      <p className={styles.count}>
        {isLoading
          ? 'Loading models...'
          : formatModelCount(filteredTablets.length)}
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
      ) : tablets.length === 0 ? (
        <p>There are no tablets yet</p>
      ) : filteredTablets.length === 0 ? (
        <p>There are no tablets matching the query</p>
      ) : (
        <>
          <ProductsList products={visibleTablets} />

          {perPage !== 'all' && (
            <Pagination
              total={sortedTablets.length}
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
