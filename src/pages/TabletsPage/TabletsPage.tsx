import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styles from './TabletsPage.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { CatalogFilters } from '../../components/CatalogFilters';
import { sortProducts } from '../../helpers/sorting';

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    fetch('./api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        const tablets = data.filter(item => item.category === 'tablets');

        setProducts(tablets);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sort);
  }, [products, sort]);

  const isAll = perPage === 'all';
  const itemsPerPage = isAll ? sortedProducts.length : Number(perPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = isAll ? sortedProducts.length : startIndex + itemsPerPage;

  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', newSort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', newPerPage);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img
            src="img/icons/home.svg"
            alt="Home"
            className={styles.homeIcon}
            onError={e => {
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.style.display = 'none';
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.parentElement!.innerText = 'Home';
            }}
          />
        </Link>

        <span className={styles.arrowIcon}>{'>'}</span>

        <span className={styles.currentParams}>Tablets</span>
      </div>

      <h1 className={styles.title}>Tablets</h1>

      <p className={styles.modelsCount}>{products.length} models</p>

      <CatalogFilters
        sort={sort}
        perPage={perPage}
        onSortChange={handleSortChange}
        onPerPageChange={handlePerPageChange}
      />

      {isLoading && <h1>Loading...</h1>}

      {!isLoading && !isError && (
        <>
          <div className={styles.grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!isAll && products.length > itemsPerPage && (
            <Pagination
              total={products.length}
              perPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <h2>There are no tablets yet </h2>
      )}

      {isError && <h1>Something went wrong</h1>}
    </div>
  );
};
