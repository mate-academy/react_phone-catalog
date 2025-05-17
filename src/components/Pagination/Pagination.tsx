import React, { memo } from 'react';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import paginationStyles from './Pagination.module.scss';
import classNames from 'classnames';
import { IconButton } from '../IconButton';

type Props = {
  totalProducts: number;
  currentPage: number;
  perPage: number;
  maxVisiblePages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = memo(
  ({ totalProducts, currentPage, perPage, maxVisiblePages, onPageChange }) => {
    if (maxVisiblePages <= 0) {
      throw new Error('Incorrect maxVisiblePages value');
    }

    const totalPages = Math.ceil(totalProducts / perPage);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const getVisiblePages = () => {
      if (maxVisiblePages >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const visiblePages: number[] = [];
      const pagesToDistribute = maxVisiblePages - 1;
      const pagesBefore = Math.floor(pagesToDistribute / 2);
      const pagesAfter = pagesToDistribute - pagesBefore;

      let startPage = currentPage - pagesBefore;
      let endPage = currentPage + pagesAfter;

      if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
      }

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      return visiblePages;
    };

    const pages = getVisiblePages();

    return (
      <nav className={paginationStyles.pagination} aria-label="Pagination">
        <ul className={paginationStyles.pagination__list}>
          <li
            className={classNames(
              paginationStyles.pagination__item,
              paginationStyles.pagination__itemPrev,
            )}
          >
            <IconButton
              disabled={isFirstPage}
              aria-disabled={isFirstPage}
              aria-label="Previous page"
              className={paginationStyles.pagination__iconButton}
              onClick={() => onPageChange(currentPage - 1)}
              iconDataPath={ICON_DATA_PATHS.ARROW.LEFT}
            />
          </li>
          {pages.map((page, index) => (
            <li key={index} className={paginationStyles.pagination__item}>
              <button
                className={classNames(paginationStyles.pagination__button, {
                  [paginationStyles['pagination__button--active']]:
                    page === currentPage,
                })}
                aria-label={`Page ${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={classNames(
              paginationStyles.pagination__item,
              paginationStyles.pagination__itemNext,
            )}
          >
            <IconButton
              disabled={isLastPage}
              aria-disabled={isLastPage}
              aria-label="Next page"
              className={paginationStyles.pagination__iconButton}
              onClick={() => onPageChange(currentPage + 1)}
              iconDataPath={ICON_DATA_PATHS.ARROW.RIGHT}
            />
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
