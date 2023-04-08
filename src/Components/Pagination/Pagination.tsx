import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';
import classNames from 'classnames';

type Props = {
  total: number,
  setPage: (element: number) => string,
  perPage: any,
  page: string
};

export const Pagination: React.FC<Props> = ({
  total, setPage, perPage, page,
}) => {
  const [paginationStart, setPaginationStart] = useState(0);
  const [paginationEnd, setPaginationEnd] = useState(6);

  const pagesCount = Math.ceil(total / +perPage);

  const pageItems = [];

  for (let i = 1; i <= pagesCount; i + 1) {
    pageItems.push(i);
  }

  const paginationHandleNext = (el: number) => {
    if (el + 5 >= total / perPage) {
      setPaginationStart((total / perPage) - 5);
      setPaginationEnd((total / perPage) + 1);
    } else {
      setPaginationStart(el - 1);
      setPaginationEnd(el + 5);
    }
  };

  const paginationHandlePrev = (el: number) => {
    if (el <= 5) {
      setPaginationStart(0);
      setPaginationEnd(6);
    } else {
      setPaginationStart(el - 6);
      setPaginationEnd(el);
    }
  };

  const onNext = (el: string) => {
    return setPage(+el + 1);
  };

  const onPrev = (el: string) => {
    return setPage(+el - 1);
  };

  const preparetedPageItems = pageItems.slice(paginationStart, paginationEnd);

  return (
    <section className="pagination">
      <Link
        to={{ search: onPrev(page) }}
        onClick={() => paginationHandlePrev(+page)}
        className={classNames(
          'pagination__button',
          { 'pagination__button--disabled': +page === 1 },
        )}
      >
        <img src="Images/arrow-icon--left.svg" alt="" />
      </Link>

      <ul className="pagination__list">
        {preparetedPageItems.map((el) => (

          <Link
            key={el}
            to={{
              search: setPage(el),
            }}
            onClick={() => paginationHandleNext(el)}
            className={classNames(
              'pagination__item',
              { 'pagination__item--active': el === +page },
            )}
          >
            {el}
          </Link>
        ))}
      </ul>

      <Link
        to={{ search: onNext(page) }}
        onClick={() => paginationHandleNext(+page)}
        className={classNames(
          'pagination__button',
          {
            'pagination__button--disabled':
              +page === Math.ceil(total / perPage),
          },
        )}
      >
        <img
          src="Images/arrow-icon--left.svg"
          alt="arrow icon"
          style={{ transform: 'rotate(180deg)' }}
        />
      </Link>
    </section>
  );
};
