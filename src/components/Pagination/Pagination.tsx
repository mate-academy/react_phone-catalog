import React from 'react';
import { PaginationButton } from './PaginationButton';
import { PaginationSettings } from './PaginationSettings';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  changeActualPage: (value: number) => void,
  setPerPage: (value: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  changeActualPage,
  setPerPage,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <nav className="pagination is-small is-full" role="navigation" aria-label="pagination">
      <PaginationSettings
        perPage={perPage}
        setPerPage={setPerPage}
      />
      <button
        type="button"
        className="pagination-previous"
        disabled={page === 1}
        onClick={() => changeActualPage(page - 1)}
      >
        Previous
      </button>
      <button
        type="button"
        className="pagination-next"
        disabled={page === lastPage}
        onClick={() => changeActualPage(page + 1)}
      >
        Next page
      </button>

      <ul className="pagination-list">
        {page > 2 && (
          <>
            <PaginationButton
              page={1}
              activePage={page}
              onPageChange={() => changeActualPage(1)}
            />
            <span className="pagination__dots">...</span>
          </>
        )}

        {page > 1 && (
          <PaginationButton
            page={page - 1}
            activePage={page}
            onPageChange={() => changeActualPage(page - 1)}
          />
        )}

        <PaginationButton
          page={page}
          activePage={page}
          onPageChange={() => changeActualPage(page)}
        />

        {page < lastPage && (
          <PaginationButton
            page={page + 1}
            activePage={page}
            onPageChange={() => changeActualPage(page + 1)}
          />
        )}

        {page < lastPage - 1 && (
          <>
            <span className="pagination__dots">...</span>
            <PaginationButton
              page={lastPage}
              activePage={page}
              onPageChange={() => changeActualPage(lastPage)}
            />
          </>
        )}
      </ul>
    </nav>
  );
}
