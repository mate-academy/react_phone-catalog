import React from 'react';
import styles from './Pagination.module.scss';
import { arrowLeftIconMap } from '../../config/arrowLeftIconMap';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { arrowRightIconMap } from '../../config/arrowRightIconMap';
import { useScrollToTop } from '../../../../hooks/useScrollToTop';

type Props = {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
}) => {
  const { theme } = useTheme();
  const scrollToTop = useScrollToTop();

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          scrollToTop();
        }}
      >
        <img
          src={
            currentPage === 1
              ? arrowLeftIconMap[theme].disabled
              : arrowLeftIconMap[theme].default
          }
          alt="Previous page"
        />
      </button>

      <div className={styles.pageList}>
        {visiblePages.map(page => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          scrollToTop();
        }}
      >
        <img
          src={
            currentPage === totalPages
              ? arrowRightIconMap[theme].disabled
              : arrowRightIconMap[theme].default
          }
          alt="Previous page"
        />
      </button>
    </div>
  );
};
