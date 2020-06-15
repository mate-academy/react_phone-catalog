import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LeftArrow, RightArrow } from '../SvgSprite/SvgSprite';
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
          <LeftArrow />
        </button>
        <ul className="pagination__page-btn-list">
         {pages.map(page =>
          <button
            key={page}
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
          <RightArrow />
        </button>
      </div>
    </section>
  )
}
