import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number,
  step: number,
  page: number,
  changePage: (arg0: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  step,
  page,
  changePage,
}) => {
  const countPage = Math.ceil(total / step);
  const arrPages = Array.from({ length: countPage }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        className="pagination__button"
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        &laquo;
      </button>

      {arrPages.map(pageNumb => (
        <button
          key={pageNumb}
          type="button"
          className={classNames(
            'pagination__button',
            { 'pagination__button--active': pageNumb === page },
          )}
          hidden={
            pageNumb !== page
            && pageNumb !== page + 1
            && pageNumb !== page - 1
          }
          onClick={() => changePage(pageNumb)}
        >
          {pageNumb}
        </button>
      ))}

      <button
        type="button"
        data-cy="paginationRight"
        className="pagination__button"
        disabled={page === countPage}
        onClick={() => changePage(page + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};
