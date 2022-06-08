import classNames from 'classnames';
import React from 'react';
import './PagePagination.scss';

type Props = {
  pages: number[];
  currentPage: number;
  onChangeSearchParams: (x: string, y: number) => void;
};

export const PagePagination: React.FC<Props> = (
  { pages, currentPage, onChangeSearchParams },
) => {
  return (
    <div className="page-pagination">
      <button
        type="button"
        className={classNames(
          'pagination-button',
          { 'pagination-button--is-disabled': currentPage === 1 },
        )}
        onClick={() => {
          onChangeSearchParams('page', currentPage - 1);
          onChangeSearchParams('perPage', pages.length);
        }}
      >
        <div className="icon-box page-pagination__icon-box">
          <span className={classNames(
            'icon', 'icon--left', { 'icon--is-disabled': currentPage === 1 },
          )}
          />
        </div>
      </button>
      {pages.map(page => (
        <div
          key={page}
          className={classNames(
            'page-pagination__box',
            { 'page-pagination__box--is-selected': page === currentPage },
          )}
        >
          {page}
        </div>
      ))}

      <button
        type="button"
        className={classNames(
          'pagination-button',
          {
            'pagination-button--is-disabled':
            currentPage === pages[pages.length - 1],
          },
        )}
        onClick={() => {
          onChangeSearchParams('page', currentPage + 1);
          onChangeSearchParams('perPage', pages.length);
        }}
      >
        <div className="icon-box page-pagination__icon-box">
          <span className={classNames(
            'icon',
            'icon--right',
            {
              'icon--is-disabled':
              currentPage === pages[pages.length - 1],
            },
          )}
          />
        </div>
      </button>
    </div>
  );
};
