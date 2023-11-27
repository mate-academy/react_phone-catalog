import React from 'react';
import classNames from 'classnames';

import './Pagination.scss';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';

import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

type PageChange = 'prev' | 'next';

type Props = {
  perPage: string;
  totalCount: number;
  currentPage: number;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<Props> = ({
  perPage,
  onSelect,
  totalCount,
  currentPage,
}) => {
  const pagesCount = (perPage.length && perPage !== 'All')
    ? Math.ceil(totalCount / +perPage)
    : 1;

  const pages = Array.from(Array(pagesCount + 1).keys()).slice(1);

  const handleArrowClick = (value: PageChange) => {
    if (value === 'prev') {
      onSelect(current => (
        current === 1 ? 1 : current - 1
      ));
    }

    if (value === 'next') {
      onSelect(current => (
        current === pagesCount ? pagesCount : current + 1
      ));
    }
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        data-cy="paginationLeft"
        className="pagination-nav"
        onClick={() => handleArrowClick('prev')}
      >
        <ArrowLeft />
      </button>

      <div className="pagination-pages">
        {pages.map(page => (
          <button
            key={page}
            type="button"
            onClick={() => onSelect(page)}
            className={classNames('pagination-page', {
              selected: currentPage === page,
            })}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        data-cy="paginationRight"
        className="pagination-nav"
        onClick={() => handleArrowClick('next')}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
