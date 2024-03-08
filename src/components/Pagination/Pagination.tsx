import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import './index.scss';
import { ICONS } from '../../images';

type Props = {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({ total, page, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === total;

  const arrayPagination = [];

  for (let i = 1; i <= total; i += 1) {
    arrayPagination.push(i);
  }

  const leftPaginationClick = () => {
    setPage(currentPage => currentPage - 1);
  };

  const rightPaginationClick = () => {
    setPage(currentPage => currentPage + 1);
  };

  const selectPage = (newPage: number) => {
    setPage(newPage);

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <section className="pagination">
      <button
        data-cy="paginationLeft"
        type="button"
        disabled={isPrevDisabled}
        className={cn('pagination__button', {
          'pagination__button--disabled': isPrevDisabled,
        })}
        onClick={leftPaginationClick}
      >
        <img
          src={isPrevDisabled ? ICONS.arrowLeftDisabled : ICONS.arrowLeft}
          alt="Previous page"
        />
      </button>

      {arrayPagination.map(item => (
        <button
          key={item}
          type="button"
          className={cn('pagination__button pagination__item', {
            'pagination__item--active': page === item,
          })}
          onClick={() => selectPage(item)}
        >
          {item}
        </button>
      ))}

      <button
        data-cy="paginationRight"
        type="button"
        disabled={isNextDisabled}
        className={cn('pagination__button', {
          'pagination__button--disabled': isNextDisabled,
        })}
        onClick={rightPaginationClick}
      >
        <img
          src={isNextDisabled ? ICONS.arrowRightDisabled : ICONS.arrowRight}
          alt="Next page"
        />
      </button>
    </section>
  );
};
