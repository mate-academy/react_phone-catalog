import React, { useEffect } from 'react';
import './Pagination.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ICONS } from '../../images/icons/Icons';

type Props = {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({ total, page, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const leftPaginationDisabled = page === 1;
  const rightPaginationDisabled = page === total;

  useEffect(() => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams]);

  const arrayPagination = [];

  for (let i = 1; i <= total; i += 1) {
    arrayPagination.push(i);
  }

  const selectPage = (newPage: number) => {
    setPage(newPage);

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  const leftClick = () => {
    setPage(prev => prev - 1);
  };

  const rightClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="pagination">
      <button
        data-cy="paginationLeft"
        type="button"
        className={cn('smallButton', {
          'smallButton--disabled': leftPaginationDisabled,
        })}
        onClick={leftClick}
        disabled={leftPaginationDisabled}
      >
        <img
          src={
            leftPaginationDisabled ? ICONS.arrowLeftDisabled : ICONS.arrowLeft
          }
          alt="Left pagination"
        />
      </button>

      {arrayPagination.map(item => (
        <button
          key={item}
          type="button"
          className={cn('smallButton pagination__item', {
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
        disabled={rightPaginationDisabled}
        className={cn('smallButton', {
          'smallButton--disabled': rightPaginationDisabled,
        })}
        onClick={rightClick}
      >
        <img
          src={
            rightPaginationDisabled
              ? ICONS.arrowRightDisabled
              : ICONS.arrowRight
          }
          alt="Right pagination"
        />
      </button>
    </section>
  );
};
