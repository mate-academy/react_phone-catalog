import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  maxVisiblePages?: number;
  className: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  maxVisiblePages = 4,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (page: string) => {
    const params = new URLSearchParams(searchParams);

    if (+page === 1) {
      params.delete('page');
    } else {
      params.set('page', page);
    }

    setSearchParams(params);
  };

  // Функція для переходу до вказаної сторінки
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(`${page}`);
    }
  };

  // Функція для обчислення видимого діапазону сторінок
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Якщо поточна сторінка ближче до кінця, коригуємо початок
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={classNames(styles.pagination, className)}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames(
          'icon',
          'icon--arrow',
          'icon--arrow--left',
          styles.pagination__button,
          styles['pagination__button--arrow'],
        )}
      ></button>

      {getVisiblePages().map(page => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={classNames(styles.pagination__button, {
            [styles['pagination__button--active']]: page === currentPage,
          })}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classNames(
          'icon',
          'icon--arrow',
          'icon--arrow--right',
          styles.pagination__button,
          styles['pagination__button--arrow'],
        )}
      ></button>
    </div>
  );
};
