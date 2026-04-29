import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import ProductCard from '../ProductCard/ProductCard';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CatalogFilters from '../CatalogFilters/CatalogFilters';

import s from './Catalog.module.scss';
import { CatalogProduct } from '../../../public/types';

const TITLES_MAP: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Catalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Використовуємо дані з Redux (переконайся, що thunk завантажує саме products.json)
  const {
    items: allProducts,
    loading,
    error,
  } = useAppSelector(state => state.products);

  // Отримуємо параметри з URL або ставимо дефолтні
  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const updateParams = (params: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === null ||
        value === 'all' ||
        (key === 'page' && value === 1)
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    setSearchParams(newParams);
  };

  const title = category ? (TITLES_MAP[category] ?? 'Catalog page') : 'Catalog page';

  // Фільтрація та сортування
  const sortedProducts = useMemo(() => {
    // 1. Фільтруємо за категорією
    const filtered = allProducts.filter(p => p.category === category);

    // 2. Сортуємо (використовуємо поля з products.json: year та price)
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'alphabet':
          return a.name.localeCompare(b.name);
        case 'cheapest':
          return a.price - b.price;
        case 'expensive': // Додаємо Most Expensive для повноти
          return b.price - a.price;
        case 'newest':
          // b - a дасть спадний порядок (найновіші перші)
          return (b.year || 0) - (a.year || 0);
        default:
          return 0;
      }
    });
  }, [allProducts, category, sort]);

  const totalCount = sortedProducts.length;
  const isAllSelected = perPage === 'all';
  const itemsPerPage = isAllSelected ? totalCount : Number(perPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Пагінація: вибираємо товари для поточної сторінки
  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  };

  if (loading) {
    return <div className={s.loader}>Loading products...</div>;
  }

  if (error) {
    return (
      <div className={s.error}>
        <p>Something went wrong</p>
        <button type="button" onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!category) return <p>No category selected</p>;

  return (
    <section className={s.catalog}>
      <Breadcrumbs />

      <h1 className={s.catalogTitle}>{title}</h1>
      <p className={s.catalogCount}>
        {totalCount} {totalCount === 1 ? 'model' : 'models'}
      </p>

      <CatalogFilters
        sort={sort}
        perPage={perPage === 'all' ? 'all' : Number(perPage)}
        onSortChange={val => updateParams({ sort: val, page: 1 })}
        onPerPageChange={val => updateParams({ perPage: val, page: 1 })}
      />

      {/* Контейнер сітки з перевіркою на порожнечу */}
      <div className={s.catalogGrid}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product as unknown as CatalogProduct}
              showDiscount
            />
          ))
        ) : (
          <p className={s.catalogEmpty}>There are no {category} yet</p>
        )}
      </div>

      {/* Пагінація відображається лише якщо не вибрано 'all' і є більше 1 сторінки */}
      {!isAllSelected && totalPages > 1 && (
        <div className={s.catalogPagination}>
          <button
            type="button"
            className={s.paginationArrow}
            disabled={currentPage === 1}
            onClick={() => updateParams({ page: currentPage - 1 })}
          >
            <img src="./img/Arrow_Left.svg" alt="Prev" />
          </button>

          <div className={s.paginationList}>
            {getVisiblePages().map(page => (
              <button
                key={`page-${page}`}
                type="button"
                className={`${s.paginationButton} ${currentPage === page ? s.active : ''}`}
                onClick={() => updateParams({ page })}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={s.paginationArrow}
            disabled={currentPage === totalPages}
            onClick={() => updateParams({ page: currentPage + 1 })}
          >
            <img src="./img/Arrow_Right.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
};
