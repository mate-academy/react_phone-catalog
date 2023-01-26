import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  totalProducts: number,
};

export const Pagination: React.FC<Props> = ({
  totalProducts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const itemsOnPage = searchParams.get('perPage') || 'All';

  const numberOfPages = itemsOnPage !== 'All'
    ? Math.floor(totalProducts / +itemsOnPage)
    : 1;

  const pages = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  useEffect(() => {
    if (currentPage === '1') {
      searchParams.delete('page');
    } else {
      searchParams.set('page', currentPage);
    }

    setSearchParams(searchParams);
  }, [currentPage]);

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        aria-label="paginationBtnLeft"
        type="button"
        data-cy="paginationLeft"
        className="
          pagination__button
          pagination__button--left
        "
        onClick={() => {
          searchParams.set('page', `${+currentPage - 1}`);
          setSearchParams(searchParams);
        }}
        disabled={+currentPage === 1}
      />
      <div className="pagination__pages">
        {pages.map(page => (
          <button
            key={page}
            aria-label="paginationBtnLeft"
            type="button"
            className={classNames(
              'pagination__page',
              { 'pagination__page--active': page === +currentPage },
            )}
            onClick={() => {
              searchParams.set('page', `${page}`);
              setSearchParams(searchParams);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        aria-label="paginationBtnLeft"
        type="button"
        data-cy="paginationRight"
        className="
          pagination__button
          pagination__button--right
        "
        onClick={() => {
          searchParams.set('page', `${+currentPage + 1}`);
          setSearchParams(searchParams);
        }}
        disabled={+currentPage === numberOfPages}
      />
    </div>
  );
};
