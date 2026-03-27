// import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../ProductCarousel';

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Catalog.module.scss';
import { Select } from '../Select';

import ArrowLeft from '../../assets/Icons/Arrow_left.svg';
import ArrowRight from '../../assets/Icons/Arrow_right.svg';

type Props = {
  products: Product[];
};

export const Catalog = ({ products }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortVal = searchParams.get('sort') ?? 'newest';
  const perPage = searchParams.get('perPage') ?? '16';
  const page = Number(searchParams.get('page') ?? '1');

  const handleSortChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set('sort', value);
    } else {
      next.delete('sort');
    }

    next.delete('page'); // скидаємо до 1 при зміні сортування
    setSearchParams(next);
  };

  const handlePerPageChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set('perPage', value);
    } else {
      next.delete('perPage');
    }

    next.set('page', '1'); // скидаємо сторінку
    setSearchParams(next);
  };

  const handlePageChange = (value: number) => {
    const next = new URLSearchParams(searchParams.toString());

    next.set('page', String(value));
    setSearchParams(next);
  };

  const sortProducts = (items: Product[], sort: string) => {
    const copy = [...items];

    switch (sort) {
      case 'newest':
        return copy.sort((a, b) => Number(b.year) - Number(a.year));
      case 'oldest':
        return copy.sort((a, b) => Number(a.year) - Number(b.year));
      case 'price_rise':
        return copy.sort((a, b) => {
          const pa = a.price ?? 0;
          const pb = b.price ?? 0;

          return pa - pb;
        });
      case 'price_descent':
        return copy.sort((a, b) => {
          const pa = a.price ?? 0;
          const pb = b.price ?? 0;

          return pb - pa;
        });
      default:
        return copy;
    }
  };

  const itemsPerPage = perPage === 'all' ? Infinity : Number(perPage);
  const sorted = useMemo(
    () => sortProducts(products, sortVal),
    [products, sortVal],
  );
  const total = sorted.length;
  // const totalPages =
  //   itemsPerPage === Infinity ? 1 : Math.ceil(total / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const visible =
    itemsPerPage === Infinity
      ? sorted
      : sorted.slice(start, start + itemsPerPage);
  // ... твій попередній код (сортування, visible тощо) ...
  const totalPages =
    itemsPerPage === Infinity ? 1 : Math.ceil(total / itemsPerPage);

  // ✅ НОВА ЛОГІКА ПАГІНАЦІЇ: Встановлюємо "вікно" з 5 кнопок
  const maxVisiblePages = 5;

  // Рахуємо з якої сторінки починати (намагаємося тримати поточну по центру)
  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Якщо ми дійшли до кінця (наприклад, 10-та сторінка з 10-ти),
  // зміщуємо старт назад, щоб завжди показувати 5 кнопок
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Створюємо масив тільки для цих видимих сторінок
  const visiblePages = [];

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handlePrev = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price_rise', label: 'Price on rise' },
    { value: 'price_descent', label: 'Price on descent' },
  ];

  const pagintationOptions = [
    { value: '16', label: '16' },
    { value: '32', label: '32' },
    { value: '64', label: '64' },
  ];

  return (
    <>
      <div className={styles.toolBar}>
        <div className={styles.toolBar__sort}>
          <div className={styles.toolBar__sort__title}>Sort by</div>
          <Select
            options={sortOptions}
            value={sortVal}
            placeholder="Default"
            onChange={handleSortChange}
          />
        </div>

        <div className={styles.toolBar__pagination}>
          <div className={styles.toolBar__pagination__title}>Items on page</div>
          <Select
            options={pagintationOptions}
            value={perPage}
            placeholder="Default"
            onChange={handlePerPageChange}
          />
        </div>
      </div>

      <div className={styles.catalog}>
        {visible.map(product => (
          <ProductCard product={product} discount={true} key={product.id} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pagination__navBack}
          onClick={handlePrev}
          disabled={page <= 1}
        >
          <img src={ArrowLeft} alt="arrow_left" />
        </button>

        <ul className={styles.pagination__list}>
          {visiblePages.map(pageNum => (
            <li
              key={pageNum}
              className={`${styles.pagination__list__item} ${page === pageNum ? styles.active : ''}`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </li>
          ))}
        </ul>

        <button
          className={`${styles.pagination__navNext} ${page < totalPages ? '' : styles.disabled}`}
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          <img src={ArrowRight} alt="arrow_right" />
        </button>
      </div>
    </>
  );
};
