import styles from './CategoryPage.module.scss';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { NotFoundPage } from '../NotFoundPage';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SortSelect } from '../../components/SortSelect';
import { PerPageSelect } from '../../components/PerPageSelect/PerPageSelect';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useProducts } from '../../context/useProducts';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { usePaginatedProducts } from '../../hooks/usePaginatedProducts';
import { useProcessedProducts } from '../../hooks/useProcessedProducts';
import { getCategoryTitle, VALID_CATEGORIES } from '../../utils/categoryHelper';

export const CategoryPage = () => {
  const { products, isLoading: isGlobalLoading, error } = useProducts();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [category]);

  const query = searchParams.get('query') || '';
  const sort = (searchParams.get('sort') || 'year') as
    | 'year'
    | 'name'
    | 'price';
  const perPageParam = searchParams.get('perPage') || 'all';
  const pageParam = Number(searchParams.get('page') || '1');

  const pageTitle = getCategoryTitle(category);

  const processedProducts = useProcessedProducts(products, {
    sort,
    filters: { category, query },
  });

  const { visibleProducts, total } = usePaginatedProducts(processedProducts, {
    page: pageParam,
    perPage: perPageParam === 'all' ? 'all' : Number(perPageParam),
  });

  const showLoader = isGlobalLoading || isPageLoading || !products.length;

  const isCategoryValid = category
    ? VALID_CATEGORIES.includes(category)
    : false;

  if (!isCategoryValid) {
    return <NotFoundPage />;
  }

  if (showLoader) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const renderEmptyState = () => {
    if (query) {
      return (
        <p>There are no products matching the query &quot;{query}&quot;</p>
      );
    }

    return <p>There are no {category} yet</p>;
  };

  return (
    <div className={styles.categoryPage__container}>
      <div className={styles.categoryPage__beadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.categoryPage__heading}>{pageTitle}</h1>
      <div className={styles.categoryPage__count}>{total} models</div>
      <div className={styles.categoryPage__dropboxContainer}>
        <div className={styles.categoryPage__sortSelect}>
          <SortSelect />
        </div>
        <div className={styles.categoryPage__perPageSelect}>
          <PerPageSelect />
        </div>
      </div>

      {total > 0 ? (
        <ProductsList products={visibleProducts} hasDiscount={true} />
      ) : (
        renderEmptyState()
      )}

      <div className={styles.categoryPage__pagination}>
        {total > 0 && <Pagination totalItems={total} />}
      </div>
    </div>
  );
};
