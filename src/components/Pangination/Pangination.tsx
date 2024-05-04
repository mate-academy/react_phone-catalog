import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const location = useLocation();

  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, 2);

      if (currentPage <= 4) {
        pageNumbers.push(3, 4, 5);
        pageNumbers.push('...');
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 4, totalPages - 3, totalPages - 2);
      } else {
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages - 1, totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      <nav
        className="pagination is-rounded"
        role="navigation"
        aria-label="pagination"
      >
        <button
          className="pagination-previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          className="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next page
        </button>

        <ul className="pagination-list">
          {generatePageNumbers().map((pageNumber, index) => (
            <li key={index}>
              {typeof pageNumber === 'number' ? (
                <NavLink
                  to={{
                    pathname: location.pathname,
                    search: `?page=${pageNumber}`,
                  }}
                  className={
                    pageNumber === currentPage
                      ? 'pagination-link is-current'
                      : 'pagination-link'
                  }
                  aria-label={`Goto page ${pageNumber}`}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </NavLink>
              ) : (
                <span className="pagination-ellipsis">...</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
