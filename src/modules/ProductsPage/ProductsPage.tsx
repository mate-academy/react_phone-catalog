import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/api/products';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useLanguage } from '../shared/context/LanguageContext';
import styles from './ProductsPage.module.scss';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  const sort = searchParams.get('sort') || '';
  const perPageParam = searchParams.get('perPage') || 'all';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query') || '';

  const loadData = useCallback(() => {
    setLoading(true);
    setHasError(false);

    getProducts()
      .then(allProducts => {
        const filtered = allProducts.filter(p => p.category === category);

        setProducts(filtered);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Page title mapping
  const titleMap = {
    phones: 'Phones page',
    tablets: 'Tablets page',
    accessories: 'Accessories page',
  };

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sort) {
      case 'age':
        return list.sort((a, b) => b.year - a.year);
      case 'title':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      default:
        return list;
    }
  }, [products, sort]);

  // Search filtering
  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return sortedProducts;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return sortedProducts.filter(p =>
      p.name.toLowerCase().includes(normalizedQuery),
    );
  }, [sortedProducts, query]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const isAll = perPageParam === 'all';
  const itemsPerPage = isAll
    ? totalItems
    : parseInt(perPageParam, 10) || totalItems;
  const currentPage = Math.max(1, pageParam);

  const paginatedProducts = useMemo(() => {
    if (isAll || itemsPerPage <= 0) {
      return filteredProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, isAll, itemsPerPage, currentPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value && value !== 'all') {
      newParams.set('perPage', value);
    } else {
      newParams.delete('perPage');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage > 1) {
      newParams.set('page', String(newPage));
    } else {
      newParams.delete('page');
    }

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className="main-container">
        <Breadcrumbs items={[{ label: categoryName }]} />

        <h1 className={styles.title}>{titleMap[category]}</h1>

        {loading ? (
          <Loader />
        ) : hasError ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{t('somethingWentWrong')}</p>
            <button
              type="button"
              className={styles.reloadButton}
              onClick={loadData}
            >
              {t('reload')}
            </button>
          </div>
        ) : products.length === 0 ? (
          <p className={styles.emptyMessage}>
            {t('noProductsYet', { category })}
          </p>
        ) : (
          <>
            <p className={styles.modelsCount}>
              {filteredProducts.length} {t('models')}
            </p>

            <div className={styles.filtersBar}>
              <div className={styles.filterGroup}>
                <label htmlFor="sort-select" className={styles.filterLabel}>
                  {t('sortBy')}
                </label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={handleSortChange}
                  className={styles.select}
                  data-cy="sortSelect"
                >
                  <option value="age">{t('newest')}</option>
                  <option value="title">{t('alphabetically')}</option>
                  <option value="price">{t('cheapest')}</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label htmlFor="per-page-select" className={styles.filterLabel}>
                  {t('itemsOnPage')}
                </label>
                <select
                  id="per-page-select"
                  value={perPageParam}
                  onChange={handlePerPageChange}
                  className={styles.select}
                  data-cy="paginationSelect"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">{t('all')}</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <p className={styles.emptyMessage}>
                {t('noMatchingProducts', { category })}
              </p>
            ) : (
              <>
                <ProductsList products={paginatedProducts} />

                {!isAll && (
                  <Pagination
                    total={totalItems}
                    perPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
