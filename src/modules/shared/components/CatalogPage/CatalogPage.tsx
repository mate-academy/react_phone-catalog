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
import { ProductsList } from '../ProductList/ProductList';
import NotFoundPage from '@/modules/NotFoundPage/NotFoundPage';
import styles from './CatalogPage.module.scss';

export const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { category } = useParams();
  const isFirstCategoryRender = useRef(true);

  // Ініціалізація стейту з URL
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
  const isValid = allowedCategories.includes(category || '');
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

  // 1. Скидання фільтрів при зміні категорії
  useEffect(() => {
    if (isFirstCategoryRender.current) {
      isFirstCategoryRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.delete('sort');
    params.delete('perPage');
    params.delete('page');

    // Тут ми не робимо set..., бо наступний useEffect (синхронізація)
    // побачить зміну params і оновить стейт сам.
    setSearchParams(params);
  }, [category]);

  // 2. ГОЛОВНА СИНХРОНІЗАЦІЯ: URL -> State
  // Це єдине місце, де ми оновлюємо page, sort, perPage
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setSortOption(searchParams.get('sort') || '');

    // Якщо в URL є 'all', воно запишеться сюди як рядок 'all'
    setPerPageOption(
      searchParams.get('perPage') || DEFAULT_PER_PAGE.toString(),
    );
  }, [searchParams]);

  // 3. Завантаження даних
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

  // --- HANDLERS (Тільки оновлюють URL) ---

  const handleSortChange = (value: string | null) => {
    // Видалив setSortOption(value)
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    params.delete('page'); // Скидаємо на 1 сторінку
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string | null) => {
    // Видалив setPerPageOption(value)
    const params = new URLSearchParams(searchParams);

    // Завжди скидаємо сторінку на 1 при зміні кількості елементів
    params.delete('page');

    if (!value) {
      // Якщо раптом прийшов null (хоча з селекта навряд чи)
      params.delete('perPage');
    } else if (value === DEFAULT_PER_PAGE.toString()) {
      // Якщо це дефолтне значення (наприклад, "16"), можна не показувати в URL
      // (або приберіть цю умову, якщо хочете бачити ?perPage=16 завжди)
      params.delete('perPage');
    } else {
      // Тут обробляється і "4", і "8", і "all"
      // В URL буде ?perPage=all або ?perPage=4
      params.set('perPage', value);
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    // Видалив setPage(newPage)
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  // --- ФІЛЬТРАЦІЯ ТА ВІДОБРАЖЕННЯ ---

  let filteredProducts = products;

  if (category) {
    const normalized = category.toLowerCase();
    filteredProducts = products.filter(
      product => product.category.toLowerCase() === normalized,
    );
  }

  const totalCount = filteredProducts.length;

  let visibleProducts = filteredProducts;

  // Логіка для 'all':
  // Якщо perPageOption === 'all', то perPageNumber буде null (через NaN або явну перевірку)
  // Або перевіримо явно:
  const isAll = perPageOption === 'all';
  const perPageNumber = !isAll && perPageOption ? Number(perPageOption) : null;

  if (perPageNumber) {
    const start = (page - 1) * perPageNumber;
    visibleProducts = filteredProducts.slice(start, start + perPageNumber);
  }

  const shouldShowPagination =
    !loading &&
    !error &&
    perPageNumber !== null && // Якщо "all", пагінації немає
    totalCount > perPageNumber;

  const skeletons = Array(8).fill(null);
  const categoryNameForMessage = getCategoryNameForMessage();

  return !isValid ? (
    <NotFoundPage />
  ) : (
    <div className={styles.catalog}>
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

      {error && (
        <div className={styles.catalog__error}>
          <p>Something went wrong</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

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
