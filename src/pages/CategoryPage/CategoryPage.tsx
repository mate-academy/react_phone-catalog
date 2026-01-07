import React, { useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAllProductsStore from '../../stores/useAllProductsStore';
import { useProductFiltering } from '../../hooks/useProductFiltering';
import SortFilterBar from './components/SortFilterBar/SortFilterBar';
import Pagination from './components/Pagination/Pagination';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import useLanguageStore from '../../stores/useLanguageStore';
import { NotFound } from '../NotFound/NotFound';
import { useScrollOnUpdate } from '../../hooks/useScrollOnUpdate';
import styles from './CategoryPage.module.scss';
import classNames from 'classnames';
import { ProductCardEmpty } from '../../components/ProductCardEmpty';
import { ErrorNotification } from '../../components/ErrorNotification';

const CategoryPage: React.FC = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguageStore();
  const { category = '' } = useParams<{ category: string }>();

  const emptyCards = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Беремо дані з useAllProductsStore
  const { phones, tablets, accessories, isLoading, error, fetchAllProducts } =
    useAllProductsStore();

  const [searchParams] = useSearchParams(); // Для читання URL

  // Отримуємо searchQuery безпосередньо з URL
  const searchQueryFromUrl = searchParams.get('query') || '';

  // Вибираємо відповідний масив продуктів за поточною категорією
  const currentCategoryProducts = useMemo(() => {
    switch (category) {
      case 'phones':
        return phones;
      case 'tablets':
        return tablets;
      case 'accessories':
        return accessories;
      default:
        return null;
    }
  }, [category, phones, tablets, accessories]);

  // Використовуємо хук для фільтрації та пагінації
  const {
    currentSortBy,
    currentPerPage,
    currentPage,
    setSortBy,
    setPerPage,
    setCurrentPage,
    paginatedProducts,
    totalProducts,
    totalPages,
  } = useProductFiltering(currentCategoryProducts, searchQueryFromUrl); // <-- Передаємо відфільтровані дані

  useEffect(() => {
    // Запускаємо завантаження всіх продуктів, якщо вони ще не завантажені
    fetchAllProducts();
  }, [fetchAllProducts]);

  useScrollOnUpdate(
    productsRef,
    [searchQueryFromUrl, currentPage, category],
    category,
  );

  useEffect(() => {
    console.log('Поточні параметри URL змінені:', searchParams.toString());

    if (searchParams.toString() === 'perPage=4') {
      // Якщо бачиш, що сторінка зникла
      console.trace('Хто викликав оновлення?');
    }
  }, [searchParams]);

  // Функція для генерації URL-адреси сторінки пагінації (без змін)
  const generatePageUrl = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', String(page));
    }

    return `/${category}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
  };

  // Логіка відображення завантаження та помилок
  if (isLoading && !currentCategoryProducts) {
    // Показуємо лоадер лише якщо ще немає даних
    return (
      <>
        <p>Завантаження продуктів...</p>

        <div className={styles['category-page']}>
          <Breadcrumbs product={{ category: category, name: category }} />

          <div className={styles['category-header']}>
            <h1
              className={classNames(
                styles['category-header__title'],
                styles.skeleton,
              )}
            ></h1>

            <p
              className={classNames(
                styles['category-header__total-products'],
                styles.skeleton,
              )}
            ></p>
          </div>

          <div className={styles['category-controls']}>
            <SortFilterBar
              currentSortBy={currentSortBy}
              setSortBy={setSortBy}
              currentPerPage={currentPerPage}
              setPerPage={setPerPage}
            />
          </div>

          <div className={styles['category-products']}>
            {emptyCards.map((_, index) => (
              <ProductCardEmpty key={index} />
            ))}
          </div>

          {/* Пагінація */}
          <div
            className={styles.skeleton}
            style={{ width: '250px', height: '32px', margin: '0 auto' }}
          />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className={styles['category-page']}>
        <Breadcrumbs product={{ category: category, name: category }} />

        <ErrorNotification message={error} onRetry={fetchAllProducts} />
      </div>
    );
  }

  // Якщо дані для поточної категорії ще не готові або категорія невідома
  if (!currentCategoryProducts) {
    return <NotFound />;
  }

  return (
    <>
      <div className={styles['category-page']}>
        <Breadcrumbs product={{ category: category, name: category }} />

        <div className={styles['category-header']}>
          <h1 className={styles['category-header__title']}>
            {t(`nav_${category}`)}
          </h1>

          <p className={styles['category-header__total-products']}>
            {totalProducts} {t('category_models_count')}
          </p>
        </div>

        <div className={styles['category-controls']}>
          <SortFilterBar
            currentSortBy={currentSortBy}
            setSortBy={setSortBy}
            currentPerPage={currentPerPage}
            setPerPage={setPerPage}
          />
        </div>

        {paginatedProducts.length === 0 ? (
          <NotFound detailsPage={true} />
        ) : (
          <div className={styles['category-products']} ref={productsRef}>
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          generatePageUrl={generatePageUrl}
        />
      </div>
    </>
  );
};

export default CategoryPage;
