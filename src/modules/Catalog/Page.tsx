import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './CatalogPage.module.scss';

import { NotFound } from '../NotFound';
import { CATEGORIES } from '../../utils/categories';
import { sortProducts } from '../../utils/sorting';
import { filterProductsByCategory } from '../../utils/filtering';
import { useProducts } from '../../hooks/useProducts';
import { Spinner } from '../../components/Spinner';
import { ProductsList } from './components/ProductsList';
import { SortSelect } from './components/SortSelect';
import { SortType } from '../../types/sorting.types';
import { Pagination } from './components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';


export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();



  // 1. ХУКИ ЗАВЖДИ ЗВЕРХУ (до будь-яких return)
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, products } = useProducts(category || 'phones');

  // 2. Параметри з URL
  const sortBy = (searchParams.get('sort') as SortType) || SortType.Newest;
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  // 3. Функція оновлення (має бути оголошена ДО використання в обробниках)
  const updateSearchWith = (params: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  // 4. useMemo для фільтрації (теж хук, тому до return)
  const visibleProducts = useMemo(() => {
    if (!products) return [];
    return filterProductsByCategory(products, category || 'phones');
  }, [products, category]);

  // 5. ТЕПЕР МОЖНА РОБИТИ ПЕРЕВІРКИ (Early returns)
  if (!category) return <NotFound />;

  const currentCategory = CATEGORIES.find(cat => cat.apiEndpoint === category);
  if (!currentCategory) return <NotFound />;

  if (loading) return <Spinner />;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  if (!products.length || visibleProducts.length === 0) {
    return <p className={styles.empty}>Product not found</p>;
  }

  // 6. Логіка обчислень
  const sortedProducts = sortProducts(visibleProducts, sortBy);
  const itemsPerPage = perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const finalProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 7. Обробники
  const onSortChange = (value: string) => updateSearchWith({ sort: value, page: '1' });
  const onPerPageChange = (value: string) => updateSearchWith({ perPage: value, page: '1' });
  const onPageChange = (page: number) => updateSearchWith({ page: page.toString() });

  return (
    <div className={styles.productsBox}>
      <Breadcrumbs />
      <h1 className={styles.title}>{t(`categories.${category}`)}</h1>
      <p className={styles.countBadge}>{visibleProducts.length} {t('models')}</p>

      <SortSelect
        className={styles.sortSelect}
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={onSortChange}
        onPerPage={onPerPageChange}
      />

      <ProductsList className={styles.productsList} products={finalProducts} />

      {perPage !== 'all' && totalPages > 1 && (
        <Pagination
          className={styles.pagination}
          total={totalPages}
          current={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
