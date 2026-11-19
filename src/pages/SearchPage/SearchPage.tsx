import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { ProductsListSkeleton } from '../../components/Skeletons';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getPublicUrl } from '../../utils/getPublicUrl';
import { formatModelCount } from '../../utils/formatModelCount';
import styles from './SearchPage.module.scss';
import { Pagination } from '../../components/Pagination';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(getPublicUrl('/api/products.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = query
    ? products.filter(product => product.name.toLowerCase().includes(query))
    : [];

  const perPage = 16;
  const page = Number(searchParams.get('page')) || 1;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));

  const currentPage = Math.min(Math.max(1, Math.floor(page)), totalPages);

  const startIndex = (currentPage - 1) * perPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + perPage,
  );

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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={styles.main}>
      <Breadcrumbs currentPage="Search" />

      <h1 className={styles.title}>Search results</h1>

      {isLoading ? (
        <ProductsListSkeleton count={8} />
      ) : hasError ? (
        <p>Something went wrong</p>
      ) : !query ? (
        <p>Enter a product name to start searching</p>
      ) : (
        <>
          <p className={styles.count}>
            {formatModelCount(filteredProducts.length)}
          </p>

          {filteredProducts.length === 0 ? (
            <p>There are no products matching the query</p>
          ) : (
            <>
              <ProductsList products={visibleProducts} />

              {filteredProducts.length > perPage && (
                <div className={styles.pagination}>
                  <Pagination
                    total={filteredProducts.length}
                    perPage={perPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};
