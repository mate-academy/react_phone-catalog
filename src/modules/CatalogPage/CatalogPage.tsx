import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { SortSelect } from '../../components/SortSelect/SortSelect';
import { ItemsPerPageSelect } from '../../components/ItemsPerPageSelect/ItemsPerPageSelect';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { usePagination } from '../../hooks/usePagination';
import { sortProducts } from '../../utils/sortHelpers';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';

interface Props {
  products: Product[];
  title: string;
  loading: boolean;
  error: string | null;
}

export const CatalogPage: React.FC<Props> = ({
  products,
  title,
  loading,
  error,
}) => {
  const { sortBy, perPage, page, changeParam } = useCatalogParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  // 1. Фільтруємо масив за пошуковим запитом з URL (який туди тепер пише Header)
  const searchedProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. Сортуємо вже знайдені товари
  const sortedProducts = sortProducts(searchedProducts, sortBy);

  // 3. Рахуємо координати пагінації для знайдених та відсортованих товарів
  const { startIndex, endIndex, totalPages } = usePagination({
    totalItems: sortedProducts.length,
    currentPage: page,
    perPage: perPage,
  });

  // 4. Обрізаємо масив для виводу на поточний екран
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);

  return (
    <div className={styles.catalog}>
      <Breadcrumbs currentPath={title} />

      <h1 className={styles.catalog__title}>{title}</h1>

      {loading && <p>Loading products...</p>}

      {error && (
        <div className={styles.catalog__error}>
          <p>Something went wrong...</p>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* А. Якщо пошук знайшов товари — показуємо лічильник, селекти та сітку */}
          {searchedProducts.length > 0 ? (
            <>
              <p className={styles.catalog__count}>
                {searchedProducts.length} models
              </p>

              <div className={styles.catalog__controls}>
                <div className={styles.catalog__selects}>
                  <SortSelect
                    currentSort={sortBy}
                    onChange={value => changeParam('sort', value)}
                  />

                  <ItemsPerPageSelect
                    value={perPage}
                    onChange={value => changeParam('perPage', value)}
                  />
                </div>
              </div>

              <ProductsList products={visibleProducts} />

              {totalPages > 1 && perPage !== 'all' && (
                <Pagination
                  total={totalPages}
                  current={page}
                  onChange={newPage => changeParam('page', String(newPage))}
                />
              )}
            </>
          ) : (
            // Б. Якщо пошук видав 0 результатів
            <p className={styles.catalog__empty}>
              There are no {title.toLowerCase()} matching the query.
            </p>
          )}
        </>
      )}
    </div>
  );
};
