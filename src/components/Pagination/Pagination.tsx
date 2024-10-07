import React from 'react';
import './Pagination.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '';

  const handlePageChange = (event: number) => {
    const newSearchParams = getSearchWith(searchParams, {
      page: `${event}` || null,
    });

    setSearchParams(newSearchParams.toLowerCase());
  };

  const handleNext = () => {
    if (+page < totalPages) {
      handlePageChange(+page + 1);
    }
  };

  const handlePrev = () => {
    if (+page > 1) {
      handlePageChange(+page - 1);
    }
  };

  const PageLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li
          className={cn('pagination__item', {
            active: +page === i,
          })}
          key={i}
        >
          <button
            className={cn('pagination__button', { 'is-pressed': +page === i })}
            onClick={() => handlePageChange(i)}
            disabled={+page === i}
          >
            {i}
          </button>
        </li>,
      );
    }

    let result: JSX.Element[] = [];

    if (totalPages < 6) {
      result = links;

      return result;
    }

    if (+page < 3) {
      result = links.slice(0, 3);
      result.push(<p className="pagination__dots">...</p>);
      result.push(...links.slice(-1));

      return result;
    }

    if (+page >= 3 && totalPages - +page >= 3) {
      result = links.slice(+page - 2, +page + 1);
      result.unshift(<p className="pagination__dots">...</p>);
      result.unshift(...links.slice(0, 1));
      result.push(<p className="pagination__dots">...</p>);
      result.push(...links.slice(-1));

      return result;
    }

    if (totalPages - +page < 3) {
      result = links.slice(0, 1);
      result.push(<p className="pagination__dots">...</p>);
      result.push(...links.slice(totalPages - 3, totalPages));
    }

    return result;
  };

  return (
    <div className="pagination">
      <div className={cn('arrow__button', { 'is-not-active': +page === 1 })}>
        <button
          className={cn('left__arrow button', { 'is-not-active': +page === 1 })}
          disabled={+page === 1}
          onClick={handlePrev}
        ></button>
      </div>
      <ul className="pagination__list">{PageLinks()}</ul>
      <div
        className={cn('arrow__button', {
          'is-not-active': +page === totalPages,
        })}
      >
        <button
          className={cn('right__arrow button', {
            'is-not-active': +page === totalPages,
          })}
          disabled={+page === totalPages}
          onClick={handleNext}
        ></button>
      </div>
    </div>
  );
};
