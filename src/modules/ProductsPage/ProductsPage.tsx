import React, { useEffect, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Loader } from '../shared/Loader';
import { Select } from './components/Select';
import { Pagination } from './components/Pagination';
import { Category, Product } from '../../types/productTypes';
import { categoryMap } from '../../utils/assetsMap';
import { updateSearchParams } from './utilis/updateSearchParam';
import { countItemsByCategory, findProducts } from './utilis/sortedProducts';
import { useAppContext } from '../../hooks/useAppContext';
import { Error } from '../shared/Error';
import { ProductList } from './components/ProductList';

export const ProductsPage = () => {
  const {
    state: { products },
  } = useAppContext();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort') || 'age';
  const findProduct = searchParams.get('query') || '';

  const perPage = perPageParam ? perPageParam : 'all';
  const currentPage = pageParam ? Number(pageParam) : 1;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      const { category } = countItemsByCategory(
        currentPath as Category,
        products,
      );

      if (findProduct && category.length > 0) {
        const serachedProducts = findProducts(category, findProduct);

        if (serachedProducts.length === 0) {
          setError('No products found');
        }

        setCategoryProducts(serachedProducts);
      } else {
        setCategoryProducts(category);
      }
    } catch (e) {
      setError((e as Error).message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [currentPath, products, findProduct]);

  const handleSortChange = (value: string) => {
    updateSearchParams(searchParams, value, 'age', 'sort');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams(searchParams, page.toString(), '1', 'page');
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (value: 'all' | string) => {
    updateSearchParams(searchParams, value, 'all', 'perPage');
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!currentPath || !Object.keys(categoryMap).includes(currentPath)) {
    return <Navigate to="/" />;
  }

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortParam === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortParam === 'price') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const startIndex = (currentPage - 1) * Number(perPage);
  const endIndex = currentPage * Number(perPage);

  const paginateProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);

  return (
    <main className={styles.main}>
      <Breadcrumbs category={currentPath} />
      <h2 className={styles.main__title}>
        {categoryMap[currentPath as keyof typeof categoryMap]}
      </h2>
      <p className={styles.main__text}>{`${categoryProducts.length} models`}</p>
      <Select
        onPerPageChange={handlePerPageChange}
        perPage={perPage}
        onSortChange={handleSortChange}
        sort={sortParam}
      />
      {isLoading && <Loader />}

      {!isLoading && error === 'No products found' && (
        <p
          className={styles.noData}
        >{`There are no ${currentPath} matching the query`}</p>
      )}

      {!isLoading && error && error !== 'No products found' && (
        <div className={styles.error}>
          <Error message={error} onRetry={handleRetry} />
        </div>
      )}

      {!isLoading && !error && categoryProducts.length === 0 && (
        <p className={styles.noData}>There are no {currentPath} yet.</p>
      )}

      {!isLoading && !error && categoryProducts.length > 0 && (
        <>
          <ProductList products={paginateProducts} />
          <Pagination
            total={sortedProducts.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
};
