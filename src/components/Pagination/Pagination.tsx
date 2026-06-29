import React from 'react';
import { RoundButton } from '../Buttons/RoundButton';
import { usePaginationRange } from '../../hooks/usePaginationRange';
import styles from './Pagination.module.scss';
import cn from 'classnames';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const VISIBLE_PAGE_COUNT = 4;
const FIRST_PAGE = 1;
const PAGE_STEP = 1;

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isFirstPage = currentPage === FIRST_PAGE;
  const isLastPage = currentPage === totalPages;

  const handleClick = (page: number) => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - PAGE_STEP);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + PAGE_STEP);
    }
  };

  const pages = usePaginationRange({
    currentPage,
    totalPages,
    visiblePages: VISIBLE_PAGE_COUNT,
  });

  return (
    <div className={styles.pagination}>
      <RoundButton
        iconName="arrowLeft"
        onClick={goToPreviousPage}
        ariaLabel="Link to previous page"
        disabled={isFirstPage}
      />

      <ul className={styles.paginationList}>
        {pages.map(page => {
          return (
            <li key={page}>
              <button
                className={cn(styles.paginationItem, {
                  [styles.isActive]: currentPage === page,
                })}
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>

      <RoundButton
        iconName="arrowRight"
        onClick={goToNextPage}
        ariaLabel="Link to next page"
        disabled={isLastPage}
      />
    </div>
  );
};
