import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { PageHeader } from '../../components-cp/PageHeader/PageHeader';
import { Filters } from '../../components-cp/Filters/Filters';
import { ProductsGrid } from '../../components-cp/ProductsGrid/ProductsGrid';
import { baseProducts } from '../../data/products';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort') as
    | 'age'
    | 'title'
    | 'price'
    | null;

  const initialVisibleCount =
    perPageParam === 'all' ? 'all' : Number(perPageParam) || 16;

  const [visibleCount, setVisibleCount] = useState<number | 'all'>(
    initialVisibleCount,
  );
  const [sortField, setSortField] = useState<'age' | 'title' | 'price'>(
    sortParam || 'age',
  );

  const [error, setError] = useState(false);

  const loadProducts = () => {
    try {
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const allProducts = useMemo(
    () =>
      Array.from({ length: 95 }, (_, i) => ({
        ...baseProducts[i % baseProducts.length],
        id: `${baseProducts[i % baseProducts.length].id}-${i}`,
        originalId: baseProducts[i % baseProducts.length].id,
      })),
    [],
  );

  const sortedProducts = useMemo(() => {
    const productsCopy = [...allProducts];

    if (sortField === 'age') {
      return productsCopy.sort((a, b) => b.age - a.age);
    }

    if (sortField === 'title') {
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortField === 'price') {
      return productsCopy.sort(
        (a, b) => a.price - (a.discount || 0) - (b.price - (b.discount || 0)),
      );
    }

    return productsCopy;
  }, [allProducts, sortField]);

  const handleVisibleCountChange = (value: number | 'all') => {
    setVisibleCount(value);

    const params: Record<string, string> = {};

    if (value !== 'all') {
      params.perPage = String(value);
    }

    if (sortField) {
      params.sort = sortField;
    }

    setSearchParams(params, { replace: true });
  };

  const handleSortChange = (field: 'age' | 'title' | 'price') => {
    setSortField(field);

    const params: Record<string, string> = {};

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    if (field) {
      params.sort = field;
    }

    setSearchParams(params, { replace: true });
  };

  if (error) {
    return <ErrorMessage onRetry={loadProducts} />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs currentPage="phones" currentPageLink="/phones" />
      <PageHeader
        title={t('phonesPage.title')}
        subtitle={t('phonesPage.modelsCount', { count: allProducts.length })}
      />
      <Filters
        visibleCount={visibleCount}
        setVisibleCount={handleVisibleCountChange}
        setSortField={handleSortChange}
      />
      <ProductsGrid products={sortedProducts} visibleCount={visibleCount} />
    </div>
  );
};
