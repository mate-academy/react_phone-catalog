import React from 'react';
import './Pagination.scss';
import ReactPaginate from 'react-paginate';
// import { useSearchParams } from "react-router-dom";

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
  // const [searchParams] = useSearchParams();
  // const currentPage = Number(searchParams.get("page")) || 0;

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={
          <img src="../../../public/img/icons/arrow-prev.svg" alt="Previous" />
        }
        nextLabel={
          <img src="../../../public/img/icons/arrow-next.svg" alt="Next" />
        }
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
