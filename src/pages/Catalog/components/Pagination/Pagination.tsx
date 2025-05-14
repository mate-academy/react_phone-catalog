import React from 'react';
import { SearchLink } from '../../../../components/SearchLink';
import classNames from 'classnames';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  visibleCount?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  visibleCount = 5,
}) => {
  const pages: number[] = [];

  const half = Math.floor(visibleCount / 2);

  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (visibleCount % 2 === 0) {
    endPage -= 1;
  }

  if (startPage < 1) {
    startPage = 1;
    endPage = visibleCount;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visibleCount + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <button
        className={classNames('button-box button--arrow-left', {
          'button--disabled': currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      ></button>

      {pages.map(page => (
        <SearchLink
          params={{ page: `${page}` }}
          className={classNames('button-box', {
            'button--active': currentPage === page,
          })}
          onClick={() => onPageChange(page)}
          key={page}
        >
          {page}
        </SearchLink>
      ))}

      <button
        className={classNames('button-box button--arrow-right', {
          'button--disabled': currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      ></button>
    </>
  );
};
