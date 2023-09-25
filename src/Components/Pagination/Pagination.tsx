import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { Link } from 'react-router-dom';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const [isDisabledLeft, setIsDisabledLeft] = useState(false);
  const [isDisabledRight, setIsDisabledRight] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      setIsDisabledLeft(true);
    } else {
      setIsDisabledLeft(false);
    }

    if (currentPage === totalPages) {
      setIsDisabledRight(true);
    } else {
      setIsDisabledRight(false);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        className="pagination__item pagination__btn-left"
        disabled={isDisabledLeft}
        onClick={handlePrevPage}
      >
        {isDisabledLeft ? (
          <img
            data-cy="paginationLeft"
            className="pagination__arrow"
            src="images/ArrowLeft.svg"
            alt="Can't scroll to the left"
          />
        )
          : (
            <img
              data-cy="paginationLeft"
              className="pagination__arrow"
              src="images/ArrowBlack.svg"
              alt="Scroll to the left"
            />
          )}

      </button>

      {[...Array(totalPages)].map((_, pageIndex) => (
        <div
          key={`page-${pageIndex + 1}`}
          className="pagination__item"
        >
          <Link
            className={cn(
              'pagination__number',
              { active: currentPage === pageIndex + 1 },
            )}
            to={`?page=${pageIndex + 1}`}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Link>
        </div>
      ))}

      <button
        type="button"
        className="pagination__item pagination__btn-right"
        disabled={isDisabledRight}
        onClick={handleNextPage}
      >

        {isDisabledRight ? (
          <img
            src="images/DisabledArrow.svg"
            alt="Can't scroll to the right"
          />
        ) : (
          <img
            data-cy="paginationRight"
            className="pagination__arrow"
            src="images/ArrowRight.svg"
            alt="Scroll to the right"
          />
        )}
      </button>
    </div>
  );
};
