import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  phonesPerPage,
  totalPhones,
  changeCurrentPage,
}) => {
  const lastPage = Math.ceil(totalPhones / phonesPerPage);

  const pages = [];

  for (let i = 1; i <= lastPage; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      {pages.map(number => (
        <li
          key={number}

        >
          <button
            type="button"
            className="pagination__page"
            value={number}
            onClick={changeCurrentPage}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  phonesPerPage: PropTypes.number.isRequired,
  totalPhones: PropTypes.number.isRequired,
  changeCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
