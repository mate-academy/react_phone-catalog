import './Pagination.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage = 16,
  currentPage = 1,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <ReactPaginate
        pageCount={Math.ceil(total / Number(perPage))}
        onPageChange={page =>
          onPageChange(page.selected + 1)
        }
        forcePage={currentPage - 1}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        previousLabel="&lsaquo;"
        nextLabel="&rsaquo;"
        containerClassName="pagination__container"
        pageClassName="pagination__button"
        disabledClassName="pagination__button--disabled"
        previousLinkClassName="pagination__button"
        nextLinkClassName="pagination__button"
        pageLinkClassName="pagination__button"
        activeClassName="pagination__button--active"
      />
    </div>
  );
};
