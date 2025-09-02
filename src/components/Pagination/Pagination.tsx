import React from 'react';
import './Pagination.scss';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={<img src="./img/icons/arrow-prev.svg" alt="Previous" />}
        nextLabel={<img src="./img/icons/arrow-next.svg" alt="Next" />}
        pageCount={totalPages}
        // forcePage={currentPage}
        forcePage={currentPage - 1}
        // onPageChange={({ selected }) => onPageChange(selected)}
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        breakLabel={0}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </div>
  );
};
