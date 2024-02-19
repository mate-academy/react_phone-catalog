import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICONS } from '../../images/icons/icons';
import './Pagination.scss';

type Props = {
  total: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
};

export const Pagination: React.FC<Props> = ({
  total,
  page,
  setPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const leftPaginationDisabled = page === 1;
  const rightPaginationDisabled = page === total;

  const arrayPagination = [];

  for (let i = 1; i <= total; i += 1) {
    arrayPagination.push(i);
  }

  const leftPaginationClick = () => {
    setPage(previous => previous - 1);
  };

  const rightPaginationClick = () => {
    setPage(previous => previous + 1);
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
        disabled={leftPaginationDisabled}
        className={classNames('smallButton', {
          'smallButton--disabled': leftPaginationDisabled,
        })}
        onClick={leftPaginationClick}
      >
        <img
          src={leftPaginationDisabled
            ? ICONS.arrowLeftDisabled
            : ICONS.arrowLeft}
          alt="Left Pagination"
        />
      </button>

      {arrayPagination.map(item => (
        <button
          key={item}
          type="button"
          className={classNames('smallButton pagination__item', {
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
        className={classNames('smallButton', {
          'smallButton--disabled': rightPaginationDisabled,
        })}
        onClick={rightPaginationClick}
      >
        <img
          src={rightPaginationDisabled
            ? ICONS.arrowRightDisabled
            : ICONS.arrowRight}
          alt="Right Pagination"
        />
      </button>
    </section>
  );
};
