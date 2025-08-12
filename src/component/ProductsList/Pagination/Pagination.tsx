import React, { useCallback, useMemo } from 'react';
import style from './Pagination.module.scss';
import cn from 'classnames';
import arrowLeft from './../../../../public/icon/ArrowLeft white.svg';
import arrowRight from './../../../../public/icon/ArrowRight white.svg';

interface Props {
  perPage: string;
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

  const pageNumber = perPage === 'all' ? 1 : Number(perPage);

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
    <div className={style.pagination}>
      <div
        className={cn(style.pagination__item, style['pagination__item--prev'])}
      >
        <button
          className={`
            ${style.pagination__button}
            ${style['pagination__button--prev']}
          `}
          onClick={prevPage}
          disabled={firstPage}
        >
          <img
            src={arrowLeft}
            alt="prev page"
            className={style.pagination__icon}
          />
        </button>
        <div className={style.pagination__pages}>
          {middlePage().map(page => (
            <button
              key={page}
              className={cn(
                style.pagination__page,
                page === currentPage && style['pagination__page--active'],
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <div
          className={cn(
            style.pagination__item,
            style['pagination__item--next'],
          )}
        >
          <button
            className={`
            ${style.pagination__button}
            ${style['pagination__button--next']}
          `}
            onClick={nextPage}
            disabled={lastPage}
          >
            <img
              src={arrowRight}
              alt="next page"
              className={style.pagination__icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
