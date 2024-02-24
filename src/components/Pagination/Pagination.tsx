import { memo, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { PaginationProps } from './types';
import './Pagination.scss';

export const Pagination = memo<PaginationProps>(({
  itemsPerPage,
  totalItems,
  currentPage,
  onClick,
}) => {
  const numberOfPages = useMemo(() => {
    return Array.from(
      { length: Math.ceil(totalItems / itemsPerPage) },
      (_, index) => index + 1,
    );
  }, [itemsPerPage, totalItems]);

  const cantMoveLeft = useMemo(() => {
    return currentPage <= 1;
  }, [currentPage]);

  const cantMoveRight = useMemo(() => {
    return currentPage >= numberOfPages[numberOfPages.length - 1];
  }, [currentPage, numberOfPages]);

  const onClickDecrementPage = useCallback(() => {
    onClick(currentPage - 1);
  }, [currentPage, onClick]);

  const onClickIncrementPage = useCallback(() => {
    onClick(currentPage + 1);
  }, [currentPage, onClick]);

  return (
    <ul className="pagination">
      <li>
        <button
          type="button"
          className="pagination__page"
          onClick={onClickDecrementPage}
          disabled={cantMoveLeft}
        >
          {'<'}
        </button>
      </li>
      {numberOfPages.map(numberOfPage => (
        <li key={numberOfPage}>
          <button
            className={cn('pagination__page', {
              'pagination__page-active': numberOfPage === currentPage,
            })}
            type="button"
            onClick={() => onClick(numberOfPage)}
          >
            {numberOfPage}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className="pagination__page"
          onClick={onClickIncrementPage}
          disabled={cantMoveRight}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
});
