import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  goodCount: number;

}

export const PaginationWithRouter: React.FC<Props> = ({ goodCount }) => {

  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 8;

  const pages = Array(Math.ceil(goodCount / Number(perPage)))
    .fill(0, 0, 42).map((page, index) => page + index + 1);

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage));
    history.push({
      search: searchParams.toString(),
    })
  }

  const handleClick = (newPage: number) => {
    if (newPage > pages.length) {
      searchParams.set('page', String(pages.length));
    } else if (newPage < 1) {
      searchParams.set('page', String(1));
    } else {
      searchParams.set('page', String(newPage));
    }

    history.push({
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      pages={pages}
      perPage={perPage}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      handleClick={handleClick}
    />
  )
}


type PaginationProps = {
  pages: number[];
  perPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleClick: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> =  ({
  pages,
  currentPage,
  handlePageChange,
  handleClick
}) => {

  return (
    <section className="pagination">
      <div className="pagination__btn-list">
        <button className="pagination__page-btn--prev"
          onClick={() => handleClick(currentPage-1)}
        >
          <svg className="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4715
            3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868
            7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868
            12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318
            12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715
            4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
            fill="#B4BDC4"/>
          </svg>
        </button>
        <ul className="pagination__page-btn-list">
         {pages.map(page =>
          <button
            className={cn('pagination__page-btn', { 'pagination__page-btn--active': page === currentPage })}
            onClick={()=>handlePageChange(page)}
          >
            {page}
          </button>
         )}
        </ul>
        <button className="pagination__page-btn--next"
          onClick={() => handleClick(currentPage+1)}
        >
          <svg className="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.52876
            3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716
            7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157
            12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841
            12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876
            4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
            fill="#B4BDC4"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
