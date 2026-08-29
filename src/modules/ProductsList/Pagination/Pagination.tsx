import styles from './Pagination.module.scss';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import arrowLeft from '../../../images/icons/Arrow Left.png';
import arrowRight from '../../../images/icons/Arrow Right.png';
import { scrollToTop } from '../../../utils/scroolTop';

interface Props {
  perPage: string;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  total,
  onPageChange,
}) => {
  const pageNumber = perPage === 'all' ? total : Number(perPage);
  const pages = useMemo(
    () => Array.from({ length: Math.ceil(total / +perPage) }, (_, i) => i + 1),
    [perPage, total],
  );

  const middlePage = useCallback(() => {
    const pagesCount = pages.length;

    if (currentPage === 1) {
      return [1, 2, 3, 4];
    }

    if (currentPage === 2) {
      return [1, 2, 3, 4];
    }

    if (currentPage === pagesCount - 1) {
      return [pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
    }

    if (currentPage === pagesCount) {
      return [pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
    }

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }, [currentPage, pages.length]);

  const firstPage = currentPage === 1;
  const lastPage = pages.length === currentPage;

  const prevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
    scrollToTop();
  };

  const nextPage = () => {
    onPageChange(Math.max(currentPage + 1, 1));
    scrollToTop();
  };

  if (total <= pageNumber) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div
        className={cn(
          styles.pagination__item,
          styles['pagination__item--prev'],
        )}
      >
        <button
          className={`
            ${styles.pagination__button}
            ${styles['pagination__button--prev']}
          `}
          onClick={prevPage}
          disabled={firstPage}
        >
          <img
            src={arrowLeft}
            alt="prev page"
            className={styles.pagination__icon}
          />
        </button>

        <div className={styles.pagination__pages}>
          {middlePage().map(page => (
            <button
              key={page}
              className={cn(
                styles.pagination__page,
                page === currentPage && styles['pagination__page--active'],
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <div
          className={cn(
            styles.pagination__item,
            styles['pagination__item--next'],
          )}
        >
          <button
            className={`
            ${styles.pagination__button}
            ${styles['pagination__button--next']}
          `}
            onClick={nextPage}
            disabled={lastPage}
          >
            <img
              src={arrowRight}
              alt="next page"
              className={styles.pagination__icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
