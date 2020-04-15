import React, { FC } from 'react';
import './_Pagination.scss';
import cx from 'classnames';

interface Props {
  phonesPerPage: number;
  totalPhones: number;
  paginate: (numberOfPage: number) => void;
  currentPage: number;
  handlePage: (num: number) => void;
}

export const Pagination: FC<Props> = (props) => {
  const {
    phonesPerPage,
    totalPhones,
    paginate,
    currentPage,
    handlePage,
  } = props;

  const pageNumber = [];

  for (let i = 1; i < Math.ceil(totalPhones / phonesPerPage); i += 1) {
    pageNumber.push(i);
  }

  const handlePagination = (num: number) => {
    handlePage(num);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            onClick={() => handlePagination(-1)}
            disabled={currentPage === 1}
            type="button"
            className={cx('pagination__btn pagination__btn--left', {
              'pagination__btn--left--disabled': currentPage === 1,
            })}
          />
        </li>
        {
          pageNumber.map(num => (
            <li className="pagination__item" key={num}>
              <button
                type="button"
                className={cx('pagination__btn', {
                  'pagination__btn--active': num === currentPage,
                })}
                onClick={() => paginate(num)}
              >
                {num}
              </button>
            </li>
          ))
        }
        <li className="pagination__item">
          <button
            onClick={() => handlePagination(1)}
            disabled={currentPage === pageNumber.length}
            type="button"
            className={cx('pagination__btn pagination__btn--right', {
              'pagination__btn--right--disabled':
                  currentPage === pageNumber.length,
            })}
          />
        </li>
      </ul>
    </div>
  );
};
