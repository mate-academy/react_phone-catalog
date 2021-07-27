import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import './Pagination.scss'

const classNames = require('classnames')

interface Props {
  cardsPerPage: number;
  totalCards: number;
}

export const Pagination: React.FC<Props> = ({ cardsPerPage, totalCards}) => {
  const pageNumbers = [];

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search)
  const currentPage = +(searchParams.get('page') || 1)

  const paginate = (page: number) => {
    searchParams.set('page', `${page}`);
    history.push({search: searchParams.toString()});
  }

  for(let i: number = 1; i <= Math.ceil(totalCards / cardsPerPage); i++){
    pageNumbers.push(i);
  }
  
  return (
    <div className="pagination">
      <button
        key="back"
        disabled={currentPage === 1}
        className="square-button"
        onClick={() => paginate(currentPage - 1)}
      >
        {"<"}
      </button>
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={classNames([
            'square-button',
            {
              'square-button_selected': currentPage === pageNum,
            }
          ])}
          onClick={() => paginate(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button
        key="forward"
        disabled={currentPage === pageNumbers.length}
        className="square-button"
        onClick={() => paginate(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  )
}
