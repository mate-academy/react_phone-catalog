import React, { useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getPaginationLinks } from '../../utils/paginationUtils';
import styles from './Pagination.module.scss';

interface Props {
  currentPage?: number;
  totalPages: number;
  className?: string;
}

const ArrowButton: React.FC<{
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}> = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'icon',
      'icon--arrow',
      `icon--arrow-${direction}`,
      styles.pagination__button,
      styles['pagination__button--arrow'],
    )}
  />
);

export const Pagination: React.FC<Props> = ({
  currentPage = 1,
  totalPages,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      if (page <= 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const pageNumbers = getPaginationLinks(totalPages, currentPage);

  return (
    <div className={cn(styles.pagination, className)}>
      <ArrowButton
        direction="left"
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pageNumbers.map((page, index) => {
        switch (page) {
          case -1:
          case 0:
            return (
              <span key={`dots-${index}`} className={styles.pagination__dots}>
                ...
              </span>
            );

          default:
            return (
              <button
                key={page}
                onClick={() => updatePage(page)}
                className={cn(styles.pagination__button, {
                  [styles['pagination__button--active']]: page === currentPage,
                })}
              >
                {page}
              </button>
            );
        }
      })}

      <ArrowButton
        direction="right"
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
