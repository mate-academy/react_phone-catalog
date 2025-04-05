import React from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import paginationStyles from './Pagination.module.scss';
import classNames from 'classnames';

type Props = {
  totalProducts: number;
  currentPage: number;
  perPage: number;
  maxVisiblePages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalProducts,
  currentPage,
  perPage,
  maxVisiblePages,
  onPageChange,
}) => {
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

    const visiblePages: (number | string)[] = [];
    const pagesToDistribute = maxVisiblePages - 1;
    const half = pagesToDistribute / 2;
    const penultimatePage = totalPages - 1;

    let startPage = Math.max(2, currentPage - Math.floor(half));
    let endPage = Math.min(penultimatePage, currentPage + Math.ceil(half));

    if (startPage >= penultimatePage - pagesToDistribute) {
      startPage = penultimatePage - pagesToDistribute;
    } else if (endPage <= maxVisiblePages) {
      endPage = maxVisiblePages;
    }

    visiblePages.push(1);

    if (startPage > 2) {
      visiblePages.push('dotted-prev');
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < penultimatePage) {
      visiblePages.push('dotted-next');
    }

    visiblePages.push(totalPages);

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
          <button
            disabled={isFirstPage}
            aria-disabled={isFirstPage}
            className={classNames('button', {
              ['button--disabled']: isFirstPage,
            })}
            aria-label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <IconSvg
              dataPath={ICON_DATA_PATHS.ARROW.LEFT}
              isDisabled={isFirstPage}
            />
          </button>
        </li>
        {pages.map((page, index) => (
          <li key={index} className={paginationStyles.pagination__item}>
            {page === 'dotted-prev' ? (
              <button
                className={paginationStyles.pagination__button}
                aria-label="Previous page"
                onClick={() => onPageChange(+pages[index + 1] - 1)}
              >
                ...
              </button>
            ) : page === 'dotted-next' ? (
              <button
                className={paginationStyles.pagination__button}
                aria-label="Next page"
                onClick={() => onPageChange(+pages[index - 1] + 1)}
              >
                ...
              </button>
            ) : (
              <button
                className={classNames(paginationStyles.pagination__button, {
                  [paginationStyles['pagination__button--active']]:
                    page === currentPage,
                })}
                aria-label={`Page ${page}`}
                onClick={() => onPageChange(+page)}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li
          className={classNames(
            paginationStyles.pagination__item,
            paginationStyles.pagination__itemNext,
          )}
        >
          <button
            disabled={isLastPage}
            aria-disabled={isLastPage}
            className={classNames('button', {
              ['button--disabled']: isLastPage,
            })}
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <IconSvg
              dataPath={ICON_DATA_PATHS.ARROW.RIGHT}
              isDisabled={isLastPage}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};
