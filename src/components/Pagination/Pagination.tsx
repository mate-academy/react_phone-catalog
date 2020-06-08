import React from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import './Pagination.scss';
import cn from 'classnames/bind';
import Button from '../Button/Button';

type PaginationProps = {
  totalPages: number;
  perPage: string;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const currentPage: number = Number(searchParams.get('page')) || 1;
  const arrPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setSearchParams = (page: number) => {
    searchParams.set('page', `${page}`);
    history.push({ search: searchParams.toString() });
  };

  const handleOnClick = (name: string) => {
    if (name === 'prev' && currentPage !== 1) {
      setSearchParams(currentPage - 1);
    }

    if (name === 'next' && currentPage !== totalPages) {
      setSearchParams(currentPage + 1);
    }
  };

  if (currentPage > totalPages) {
    const regex = /page=\d/g;
    const path = location.search.replace(regex, 'page=1');

    return (
      <Redirect to={{
        pathname: `${location.pathname}`,
        search: `${path}`,
      }}
      />
    );
  }


  return (
    <div className="pagination">
      <Button
        className="prev"
        name="prev"
        disabled={currentPage === 1}
        handleOnClick={handleOnClick}
      />
      {arrPages.map(page => (
        <button
          type="button"
          className={cn('pagination__btn', { 'pagination__btn--active': currentPage === page })}
          key={page}
          value={page}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            const target = e.target as HTMLButtonElement;

            searchParams.set('page', `${target.value}`);
            history.push({ search: searchParams.toString() });
          }}
        >
          {page}
        </button>
      ))}
      <Button
        className="next"
        name="next"
        disabled={currentPage === totalPages}
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default Pagination;
