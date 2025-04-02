import React from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import arrowLeft from '/img/icons/arrows/arrow-left-icon.svg';
import arrowRight from '/img/icons/arrows/arrow-right-icon.svg';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = Math.ceil(total / perPage);

  const handlePageChange = (value: number) => {
    if (value < 1 || value > pages) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set('page', value.toString());
    setSearchParams(params);
  };

  const getPaginationItems = () => {
    const visiblePages = 2;
    let pagination: (number | string)[] = [];

    if (pages <= 7) {
      pagination = Array.from({ length: pages }, (_, i) => i + 1);
    } else {
      const showLeftDots = currentPage > visiblePages + 2;
      const showRightDots = currentPage < pages - visiblePages - 1;

      pagination.push(1);
      if (showLeftDots) {
        pagination.push('...');
      }

      const start = Math.max(2, currentPage - visiblePages);
      const end = Math.min(pages - 1, currentPage + visiblePages);

      for (let i = start; i <= end; i++) {
        pagination.push(i);
      }

      if (showRightDots) {
        pagination.push('...');
      }

      pagination.push(pages);
    }

    return pagination;
  };

  return (
    <ul className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.page__item} ${styles.page__arrow} ${currentPage === 1 ? styles.disabled : ''}`}
      >
        <img src={arrowLeft} alt="arrow left" className={styles.page__link} />
      </button>

      {getPaginationItems().map((item, index) =>
        item === '...' ? (
          <li key={`dots-${index}`} className={styles.page__dots}>
            ...
          </li>
        ) : (
          <li
            key={item}
            onClick={() => handlePageChange(item as number)}
            className={`${styles.page__item} ${currentPage === item ? styles.active : ''}`}
          >
            <a data-cy="pageLink" className={styles.page__link}>
              {item}
            </a>
          </li>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages}
        className={`${styles.page__item} ${styles.page__arrow} ${currentPage === pages ? styles.disabled : ''}`}
      >
        <img src={arrowRight} alt="arrow right" className={styles.page__link} />
      </button>
    </ul>
  );
};
