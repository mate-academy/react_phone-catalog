import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: string) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = Math.ceil(total / +perPage);

  const pages = [];

  for (let i = 1; i <= totalPage; i += 1) {
    pages.push(i);
  }

  if (pages.length > 6) {
    if (currentPage < 3) {
      pages.splice(5);
    } else if (currentPage > totalPage - 3) {
      pages.splice(0, totalPage - 5);
    } else {
      pages.splice(0, currentPage - 3);
      pages.splice(5);
    }
  }

  const handlePageChanger = (page: string) => {
    if (+page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePagePrev = () => {
    if (currentPage !== 1) {
      onPageChange((currentPage - 1).toString());
    }
  };

  const handlePageNext = () => {
    if (currentPage !== totalPage) {
      onPageChange((currentPage + 1).toString());
    }
  };

  return (
    <div className="pagination">
      <div
        className={cn('pagination__button pagination__button--prev', {
          'pagination__button--active': currentPage !== 1,
        })}
        onClick={handlePagePrev}
      ></div>
      {pages[0] !== 1 && <span className="pagination__dots">...</span>}

      {pages.map(page => (
        <div
          key={page}
          className={cn('pagination__button', {
            'pagination__button--current': currentPage === page,
          })}
          onClick={() => handlePageChanger(page.toString())}
        >
          {page}
        </div>
      ))}
      {pages[pages.length - 1] !== totalPage && (
        <span className="pagination__dots">...</span>
      )}

      <div
        className={cn('pagination__button pagination__button--next', {
          'pagination__button--active': currentPage !== totalPage,
        })}
        onClick={handlePageNext}
      ></div>
    </div>
  );
};
