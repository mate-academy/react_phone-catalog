import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import { Product } from '@/types/Product';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { PaginationComponent } from '../PaginationComponent/PaginationComponent';
import { getProducts } from '@/api/api';
import {
  DEFAULT_PER_PAGE,
  perPageOptions,
  sortOptions,
} from '../utils/constants/constants';
import { ProductsList } from './ProductList';
import NotFoundPage from '@/modules/NotFoundPage/NotFoundPage';
import styles from './CatalogPage.module.scss';

export const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { category } = useParams();
  const isFirstCategoryRender = useRef(true);

  const [sortOption, setSortOption] = useState<string | null>(
    searchParams.get('sort') || '',
  );

  const [perPageOption, setPerPageOption] = useState<string | null>(
    searchParams.get('perPage') || DEFAULT_PER_PAGE.toString(),
  );

  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const allowedCategories = ['phones', 'tablets', 'accessories'];

  if (!allowedCategories.includes(category || '')) {
    return <NotFoundPage />;
  }
  // форматування заголовка
  const formatTitle = (param: string | undefined): string => {
    switch (param) {
      case 'phones':
        return 'Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return param
          ? param
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : 'Products';
    }
  };

  const pageTitle = formatTitle(category);

  const getCategoryNameForMessage = () => {
    switch (category) {
      case 'phones':
        return 'phones';
      case 'tablets':
        return 'tablets';
      case 'accessories':
        return 'accessories';
      default:
        return 'products';
    }
  };

  // При зміні категорії — ресет фільтрів до дефолтних значень
  useEffect(() => {
    if (isFirstCategoryRender.current) {
      isFirstCategoryRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.delete('sort');
    params.delete('perPage');
    params.delete('page'); // page=1 дефолт — не тримаємо в URL

    setSortOption('');
    setPerPageOption(DEFAULT_PER_PAGE.toString());
    setPage(1);
    setSearchParams(params);
  }, [category]);

  // синхронізація page/sort/perPage зі змінами URL (back/forward, прямі лінки)
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setSortOption(searchParams.get('sort') || '');
    setPerPageOption(
      searchParams.get('perPage') || DEFAULT_PER_PAGE.toString(),
    );
  }, [searchParams]);

  // завантаження і сортування продуктів
  useEffect(() => {
    const newTitle = `${pageTitle} page`;

    setLoading(true);
    setError(null);

    getProducts()
      .then(fetchedProducts => {
        let sortedProducts = [...fetchedProducts];

        if (sortOption) {
          sortedProducts = sortedProducts.sort((a, b) => {
            if (sortOption === 'age') {
              return b.year - a.year;
            }

            if (sortOption === 'title') {
              return a.name.localeCompare(b.name);
            }

            if (sortOption === 'price') {
              // якщо треба враховувати знижку — тут враховуй поле з ціною після знижки
              return a.price - b.price;
            }

            return 0;
          });
        }

        setProducts(sortedProducts);
        document.title = newTitle;
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, sortOption, pageTitle]);

  const handleSortChange = (value: string | null) => {
    setSortOption(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    // скидаємо на першу сторінку
    params.delete('page'); // page=1 — дефолт, не додаємо в URL
    setPage(1);

    setSearchParams(params);
  };

  const handlePerPageChange = (value: string | null) => {
    setPerPageOption(value);

    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
      params.delete('page');
      setPage(1);
    } else if (value) {
      if (Number(value) === DEFAULT_PER_PAGE) {
        // дефолтне значення — не тримаємо в URL
        params.delete('perPage');
      } else {
        params.set('perPage', value);
      }

      // page=1 — дефолт, тому теж видаляємо
      params.delete('page');
      setPage(1);
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page'); // дефолтне — не зберігаємо
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  // фільтрація за категорією
  let filteredProducts = products;

  if (category) {
    const normalized = category.toLowerCase();
    filteredProducts = products.filter(
      product => product.category.toLowerCase() === normalized,
    );
  }

  const totalCount = filteredProducts.length;

  // пагінація
  let visibleProducts = filteredProducts;

  const perPageNumber =
    perPageOption && perPageOption !== 'all' ? Number(perPageOption) : null;

  if (perPageNumber) {
    const start = (page - 1) * perPageNumber;
    visibleProducts = filteredProducts.slice(start, start + perPageNumber);
  }

  const shouldShowPagination =
    !loading && !error && perPageNumber !== null && totalCount > perPageNumber;

  const skeletons = Array(8).fill(null);

  const categoryNameForMessage = getCategoryNameForMessage();

  return (
    <div className={styles.catalog}>
      {/* явний h1 */}

      <PageHeader title={pageTitle} variant="catalogPage" />

      <div className={styles.catalog__modelsCount}>{totalCount} models</div>

      <div className={styles.catalog__controls}>
        <CustomSelect
          label="Sort by"
          options={sortOptions}
          onChange={handleSortChange}
          value={sortOption}
        />

        <CustomSelect
          label="Items per page"
          value={perPageOption}
          onChange={handlePerPageChange}
          options={perPageOptions}
        />
      </div>

      {/* помилка завантаження */}
      {error && (
        <div className={styles.catalog__error}>
          <p>Something went wrong</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {/* список / скелетони / пустий стейт */}
      {!error && (
        <>
          {loading ? (
            <div className={styles.catalog__container}>
              {skeletons.map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className={styles.catalog__empty}>
              {`There are no ${categoryNameForMessage} yet`}
            </div>
          ) : (
            <>
              <div
                className={`${styles.catalog__container} ${
                  shouldShowPagination
                    ? styles['catalog__container--hasPagination']
                    : styles['catalog__container--noPagination']
                }`}
              >
                <ProductsList products={visibleProducts} />
              </div>

              {shouldShowPagination && perPageNumber && (
                <PaginationComponent
                  totalCount={totalCount}
                  perPage={perPageNumber}
                  currentPage={page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
