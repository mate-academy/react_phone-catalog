import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav data-cy="pagination">
      <ul className="pagination__list">
        <li className={`pagination__item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="pagination__button pagination__button--back"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            data-cy="prevPage"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pagination__button--arrow"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826
                9.52868 3.52861L5.52868
                7.52861C5.26833 7.78896 5.26833 8.21107
                5.52868 8.47141L9.52868 12.4714C9.78903
                12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318
                11.789 10.4715
                11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107
                 10.7318 3.78896 10.4715 3.52861Z"
                fill="black"
              />
            </svg>
          </button>
        </li>

        {Array
          .from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li
              key={page}
              className={`pagination__list--numbers ${currentPage === page ? 'active' : ''}`}
            >
              <button
                type="button"
                className="pagination__button pagination__button--numbers"
                onClick={() => onPageChange(page)}
                data-cy={`page-${page}`}
              >
                {page}
              </button>
            </li>
          ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="pagination__button pagination__button--next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            data-cy="nextPage"
          >
            <svg
              className="pagination__button--arrow"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528636 0.528606C0.788986 0.268256 1.2111
                0.268256 1.47145 0.528606L5.47145 4.52861C5.73179
                4.78896 5.73179 5.21107 5.47145 5.47141L1.47145
                9.47141C1.2111 9.73176 0.788986 9.73176 0.528636
                9.47141C0.268287 9.21107 0.268287 8.78896 0.528636
                 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287
                  1.21107 0.268287 0.788955 0.528636 0.528606Z"
                fill="black"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
