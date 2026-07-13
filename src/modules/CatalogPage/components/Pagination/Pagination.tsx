import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination__container}>
      <button
        className={styles.pagination__arrow_button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/arrow-to-left.svg`}
          alt="Prev"
          className={styles.pagination__icon}
        />
      </button>

      <div className={styles.pagination__pages_list}>
        {visiblePages.map((item, index) => {
          if (item === '...') {
            return (
              <span key={`dots-${index}`} className={styles.pagination__dots}>
                ...
              </span>
            );
          }

          return (
            <button
              key={item}
              className={`${styles.pagination__page_button} ${currentPage === item ? styles.pagination__page_button_active : ''}`}
              onClick={() => onPageChange(item as number)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination__arrow_button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/arrow-to-right.svg`}
          alt="Next"
          className={styles.pagination__icon}
        />
      </button>
    </div>
  );
};
