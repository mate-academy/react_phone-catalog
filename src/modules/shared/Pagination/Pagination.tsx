import React from 'react';
import './Pagination.scss';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void; 
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageLimit = 4;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage < pageLimit) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + pageLimit - 1);
    } else {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }
  }

  return (
    <div className="pagination">
      <button
        className={classNames('pagination__button', {
          'pagination__button--disabled': currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {currentPage === 1 ? (
          <Icon icon={iconsObject.arrow_left__disabled} />
        ) : (
          <Icon icon={iconsObject.arrow_left} />
        )}
      </button>
      <div className="pagination__button-container">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={classNames('pagination__button-page', {
              'pagination__button-page--active':
                currentPage === startPage + index,
            })}
            onClick={() => onPageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <button
        className={classNames('pagination__button', {
          'pagination__button--disabled': currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {currentPage === totalPages ? (
          <Icon icon={iconsObject.arrow_right__disabled} />
        ) : (
          <Icon icon={iconsObject.arrow_right} />
        )}
      </button>
    </div>
  );
};
