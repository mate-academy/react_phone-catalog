import './Pagination.scss';
import React from 'react';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  productsLength: number;
  setIsGridLoading: (loading: boolean) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  productsLength,
  setIsGridLoading,
}) => {
  const totalPages = Math.ceil(productsLength / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setIsGridLoading(true);
    setCurrentPage(pageNumber);
  };

  if (totalPages <= 1) return null;
  return (
    <>
      <div className="pagination">
        <button
          className="pagination__button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <div
            className={`pagination__back ${currentPage === 1 ? 'pagination__back--inactive' : ''}`}
          ></div>
        </button>
        {pages.map(page => {
          return (
            <button
              key={page}
              className={`pagination__button ${currentPage === page ? 'pagination__button--active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          className={`pagination__button ${currentPage === totalPages ? 'pagination__button--inactive' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <div
            className={`pagination__forward ${currentPage === totalPages ? 'pagination__forward--inactive' : ''}`}
          ></div>
        </button>
      </div>
    </>
  );
};
