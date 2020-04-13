import React, { FC } from 'react';
import './_Pagination.scss';

interface Props {
  phonesPerPage: number;
  totalPhones: number;
  paginate: (numberOfPage: number) => void;
}

export const Pagination: FC<Props> = (props) => {
  const {
    phonesPerPage,
    totalPhones,
    paginate,
  } = props;

  const pageNumber = [];

  for (let i = 1; i < Math.ceil(totalPhones / phonesPerPage); i += 1) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            type="button"
            className="pagination__btn pagination__btn--left"
          />
        </li>
        {
          pageNumber.map(num => (
            <li className="pagination__item" key={num}>
              <button
                type="button"
                className="pagination__btn"
                onClick={() => paginate(num)}
              >
                {num}
              </button>
            </li>
          ))
        }
        <li className="pagination__item">
          <button
            type="button"
            className="pagination__btn pagination__btn--right"
          />
        </li>
      </ul>
    </div>
  );
};
