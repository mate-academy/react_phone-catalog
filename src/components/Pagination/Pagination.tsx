// Pagination.jsx
import { useState, useEffect } from 'react';
import { NextButton } from '../NextButton';
import { PrevButton } from '../PrevButton';
import styles from './Pagination.module.scss';
import { getPaginationItems } from '../../utils/getPaginationItems';

interface PaginationProps {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = perPage === 'All' ? 1 : Math.ceil(total / Number(perPage));
  const paginationItems = getPaginationItems(currentPage, totalPages, isMobile);

  return (
    <div className={styles.pagination}>
      <PrevButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <ul className={styles.ul}>
        {paginationItems.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <li key={`dots-${index}`}>
                <span className={styles.dots}>...</span>
              </li>
            );
          }

          return (
            <li key={item}>
              <button
                type="button"
                className={`${styles.btn} ${item === currentPage ? styles.active : ''}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      <NextButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
