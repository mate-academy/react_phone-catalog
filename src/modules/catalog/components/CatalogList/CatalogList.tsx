import React, { useMemo } from 'react';
import { Accessorie } from '../../../../types/accessorie';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import styles from './CatalogList.module.scss';
import { Product } from '../../../../types/product';
import { usePagination } from '../../../shared/hooks/usePagination';
import { SortOption, useSort } from '../../hooks/useSort';
import { ProductList } from '../../../shared/components/ProductsList';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination } from '../../../shared/components/Pagination';

export type AnyProduct = Phone | Tablet | Accessorie;

type Props = {
  products: AnyProduct[];
  title: string;
};

const mapToProduct = (item: AnyProduct): Product => {
  return {
    id: item.id,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 'year' in item ? item.year : 0,
    image: item.images[0] || '',
  };
};

export const CatalogList: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { sort, setSort } = useSort();
  const { page, perPage, setPagination } = usePagination();

  const { t } = useTranslation();

  const mappedProducts = useMemo(() => products.map(mapToProduct), [products]);

  const sortedProducts = useMemo(() => {
    const copy = [...mappedProducts];

    switch (sort) {
      case 'age':
        return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      default:
        return copy;
    }
  }, [mappedProducts, sort]);

  const searchedProducts = useMemo(() => {
    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [sortedProducts, query]);

  const totalPages = useMemo(() => {
    if (perPage === 'all' || perPage === 0) {
      return 1;
    }

    return Math.ceil(searchedProducts.length / perPage);
  }, [searchedProducts.length, perPage]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return searchedProducts;
    }

    const start = (page - 1) * perPage;

    return searchedProducts.slice(start, start + perPage);
  }, [searchedProducts, page, perPage]);

  const currentProductsQuantity = products.length;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value as SortOption;

    setSort(nextSort);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const nextPerPage = value === 'all' ? 'all' : parseInt(value, 10);

    setPagination({ page: 1, perPage: nextPerPage });
  };

  return (
    <div className={styles.listWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.quantity}>
          {t('catalog.modelsCount', { count: products.length })}
        </div>

        <div className={styles.changes}>
          <label htmlFor="sort-select" className={styles.label}>
            <p>{t('catalog.sortBy')}</p>

            <select
              id="sort-select"
              className={styles.selects}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="age" className={styles.selectOptions}>
                {t('catalog.sortOptions.newest')}
              </option>
              <option value="title" className={styles.selectOptions}>
                {t('catalog.sortOptions.alphabetically')}
              </option>
              <option value="price" className={styles.selectOptions}>
                {t('catalog.sortOptions.cheapest')}
              </option>
            </select>
          </label>

          <label htmlFor="per-page-select" className={styles.label}>
            <p>{t('catalog.itemsOnPage')}</p>

            <select
              id="per-page-select"
              className={styles.selects}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="4" className={styles.selectOptions}>
                4
              </option>
              <option value="8" className={styles.selectOptions}>
                8
              </option>
              <option value="16" className={styles.selectOptions}>
                16
              </option>
              <option value="all" className={styles.selectOptions}>
                {t('catalog.sortOptions.all')}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.listWindow}>
        {searchedProducts.length > 0 ? (
          <ProductList products={visibleProducts} />
        ) : !query ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>
              {t('catalog.emptyState.noProductsTitle', {
                category: title.toLowerCase(),
              })}
            </h2>
            <p className={styles.emptyStateSub}>
              {t('catalog.emptyState.noProductsSub')}
            </p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>
              {t('catalog.emptyState.noResultsTitle', {
                category: title.toLowerCase(),
              })}
            </h2>
          </div>
        )}
      </div>

      {currentProductsQuantity > 0 && perPage !== 'all' && totalPages > 1 && (
        <Pagination
          currentPage={page}
          perPage={perPage}
          totalItems={searchedProducts.length}
          onPageChange={nextPage => setPagination({ page: nextPage })}
        />
      )}
    </div>
  );
};
