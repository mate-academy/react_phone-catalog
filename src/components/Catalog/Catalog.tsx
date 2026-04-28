import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import ProductCard from '../ProductCard/ProductCard';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CatalogFilters from '../CatalogFilters/CatalogFilters';

// Імпортуємо модульні стилі
import s from './Catalog.module.scss';

const TITLES_MAP: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Catalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const allProducts = useAppSelector(state => state.products.items);

  const [sort, setSort] = useState('newest');
  const [perPage, setPerPage] = useState<'all' | number>(8);
  const [currentPage, setCurrentPage] = useState(1);

  const title = category ? (TITLES_MAP[category] ?? 'Catalog') : 'Catalog';

  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, perPage]);

  const sortedProducts = useMemo(() => {
    const filtered = allProducts.filter(p => p.category === category);

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'alphabet': return a.name.localeCompare(b.name);
        case 'cheapest': return a.priceDiscount - b.priceDiscount;
        case 'expensive': return b.priceDiscount - a.priceDiscount;
        case 'newest': return b.id.localeCompare(a.id);
        default: return 0;
      }
    });
  }, [allProducts, category, sort]);

  const totalCount = sortedProducts.length;
  const isAllSelected = perPage === 'all';
  const itemsPerPage = isAllSelected ? totalCount : Number(perPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

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
        perPage={perPage}
        onSortChange={setSort}
        onPerPageChange={setPerPage}
      />

      <div className={s.catalogGrid}>
        {visibleProducts.length > 0 ? (
          visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product as any}
              showDiscount
            />
          ))
        ) : (
          <p className={s.catalogEmpty}>No products found in this category</p>
        )}
      </div>

      {!isAllSelected && totalPages > 1 && (
        <div className={s.catalogPagination}>
          <button
            type="button"
            className={s.paginationArrow}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <img src="./img/Arrow_Left.svg" alt="Prev" />
          </button>

          <div className={s.paginationList}>
            {getVisiblePages().map(page => (
              <button
                key={`page-${page}`}
                type="button"
                className={`${s.paginationButton} ${currentPage === page ? s.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={s.paginationArrow}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <img src="./img/Arrow_Right.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
};
