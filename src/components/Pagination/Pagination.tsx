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
  const paginationLeftDisabled = page === 1;
  const paginationRightDisabled = page === total;

  const paginationArray = [];

  for (let i = 1; i <= total; i += 1) {
    paginationArray.push(i);
  }

  const paginationLeftClick = () => {
    setPage(prev => prev - 1);
  };

  const paginationRightClick = () => {
    setPage(prev => prev + 1);
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
        disabled={paginationLeftDisabled}
        className={classNames('smallButton', {
          'smallButton--disabled': paginationLeftDisabled,
        })}
        onClick={paginationLeftClick}
      >
        <img
          src={
            paginationLeftDisabled
              ? ICONS.arrowLeftDisabled
              : ICONS.arrowLeft
          }
          alt="Pagination left"
        />
      </button>

      {
        paginationArray.map(paginationItem => (
          <button
            key={paginationItem}
            type="button"
            className={classNames(
              'smallButton pagination__item',
              {
                'pagination__item--active':
                  page === paginationItem,
              },
            )}
            onClick={() => selectPage(paginationItem)}
          >
            {paginationItem}
          </button>
        ))
      }

      <button
        data-cy="paginationRight"
        type="button"
        disabled={paginationRightDisabled}
        className={classNames('smallButton', {
          'smallButton--disabled': paginationRightDisabled,
        })}
        onClick={paginationRightClick}
      >
        <img
          src={
            paginationRightDisabled
              ? ICONS.arrowRightDisabled
              : ICONS.arrowRight
          }
          alt="Pagination left"
        />
      </button>
    </section>
  );
};
