import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className={`flex justify-center items-center size-8 border`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="start-ellipsis"
            className="flex justify-center items-center size-8"
          >
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`flex justify-center items-center size-8 border ${currentPage === i ? 'pagination-active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span
            key="end-ellipsis"
            className="flex justify-center items-center size-8"
          >
            ...
          </span>,
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`flex justify-center items-center size-8 border`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex w-full justify-center items-center gap-4">
      <button
        className="flex justify-center items-center size-8 border"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <img src="../../public/img/icons/Vector (Stroke) left.svg" alt="back" />
      </button>
      <div className="flex gap-2">{renderPageNumbers()}</div>
      <button
        className="flex justify-center items-center size-8 border"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <img
          src="../../public/img/icons/Vector (Stroke) right.svg"
          alt="next page"
        />
      </button>
    </div>
  );
};

export default Pagination;
