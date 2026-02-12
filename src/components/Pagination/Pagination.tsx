import React, { useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { getPaginationLinks } from './utils/pagination';

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
      'icon--arrow-hover',
      `icon--arrow-${direction}-hover`,
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
        // Оновлений блок switch: тепер обробляє рядок '...'
        switch (page) {
          case -1:
          case 0:
          case '...': // Додаємо обробку рядка '...'
            return (
              <span key={`dots-${index}`} className={styles.pagination__dots}>
                ...
              </span>
            );

          default:
            // TypeScript знає, що тут залишилися тільки числа (number)
            const pageNumber = page as number;

            return (
              <button
                // Використовуємо pageNumber для ключа і onClick, щоб уникнути помилки 2345
                key={pageNumber}
                onClick={() => updatePage(pageNumber)}
                className={cn(styles.pagination__button, {
                  [styles['pagination__button--active']]:
                    pageNumber === currentPage,
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
