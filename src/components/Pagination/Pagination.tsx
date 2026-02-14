import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getPaginationLinks } from '../../utils/paginationHelper';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  className: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  const pageNumbers = getPaginationLinks(totalPages, currentPage);

  return (
    <div className={cn(styles.pagination, className)}>
      {/* ← Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'icon',
          'icon--arrow',
          'icon--arrow--left',
          styles.pagination__button,
          styles['pagination__button--arrow'],
        )}
      ></button>

      {/* Pages */}
      {pageNumbers.map((page, index) => {
        if (page === -1 || page === 0) {
          return (
            <span key={`dots-${index}`} className={styles.pagination__dots}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(styles.pagination__button, {
              [styles['pagination__button--active']]: page === currentPage,
            })}
          >
            {page}
          </button>
        );
      })}

      {/* → Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
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
