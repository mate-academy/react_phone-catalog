import React from 'react';
import classnames from 'classnames';

import './styles/pagination.css'

const Pagination = (props) => {
  const {
    handlePageChange,
    page,
    total,
    perPage,
        } = props;

  const lastPage = Math.ceil(total/perPage);
  const paginationBtns = (handlePageChange, page, lastPage) => {
    let btnsArr = [];
    for (let i = 0; i < lastPage; i++) {
      btnsArr.push(i);
    };
    return btnsArr.map((num, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(num)}
        className={classnames({
          'pagination_button': true,
          'pagination_active': page === num,
        })}
      >
        {num+1}
      </button>
    ));
  };
  return (
    <div className="pagination">
      {paginationBtns(handlePageChange, page, lastPage) }
    </div>
  )
};

export default Pagination;
