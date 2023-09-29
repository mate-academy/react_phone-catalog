import React from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import './Pagination.scss';
import { SearchParam } from '../../types/SearchParams';

type Props = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (param: SearchParam, value: string) => void
};

export const Pagination: React.FC<Props> = ({
  pagesCount,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from(Array(pagesCount + 1).keys()).slice(1);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const isPhone = useMediaQuery({ maxWidth: 600 });

  const handlePrevClick = () => {
    const page = currentPage - 1;

    if (page > 0) {
      onPageChange('page', `${page}`);
    }
  };

  const handleNextClick = () => {
    const page = currentPage + 1;

    if (page && page <= pages.length) {
      onPageChange('page', `${page}`);
    }
  };

  if (pages.length < 2) {
    return null;
  }

  return (
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        className="pagination-nav"
        onClick={handlePrevClick}
      >
        <ArrowLeft />
      </button>

      <div className="pagination-pages">
        {(isPhone || isTablet) && (pages.length > 5) ? (
          <>
            {pages.slice(0, 2).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange('page', `${page}`)}
                className={classNames({
                  pagination__active: currentPage === page,
                }, 'pagination-page')}
              >
                {page}
              </button>
            ))}
            <span className="pagination-ellipsis">...</span>
            {pages.slice(pages.length - 3).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange('page', `${page}`)}
                className={classNames({
                  pagination__active: currentPage === page,
                }, 'pagination-page')}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          pages.map(page => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange('page', `${page}`)}
              className={classNames({
                pagination__active: currentPage === page,
              }, 'pagination-page')}
            >
              {page}
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        data-cy="paginationRight"
        className="pagination-nav"
        onClick={handleNextClick}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
