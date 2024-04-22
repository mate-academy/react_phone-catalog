import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { getNumbers } from '../../utils/api';
import { getSearchWith } from '../../utils/searchHelpers';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../images/homePage/Arrow_Right.svg';
import './Pagination.scss';
import React from 'react';
import { TabAccess } from '../../types/tablets';

type Props = {
  toPagination: TabAccess[];
}

export const Pagination: React.FC<Props> = ({ toPagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (toPagination === undefined) {
    return <NotFoundPage />;
  }

  console.log(toPagination)

  const perPage = searchParams.get('perPage') || '4';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? toPagination.length : perPage;

  const total = () => {
    if (perPage === 'all') {
      setSearchParams({
        page: `${1}`.toString(),
        perPage: `${toPagination.length}`.toString(),
      });

      return toPagination.length;
    } else {
      return Math.ceil(toPagination.length / +itemsPerPage);
    }
  };

  const totalPages = total();

  const getTotalNumbersArray = (): number[] => {
    return getNumbers(1, totalPages);
  };

  const numbersToShow = 3;

  const currentPageNum = parseInt(currentPage);

  const min = Math.max(1, currentPageNum - numbersToShow / 2);
  const max = Math.min(
    totalPages,
    currentPageNum +
      numbersToShow / 2 +
      Math.max(0, min - currentPageNum + numbersToShow / 2),
  );

  const numbersToLoad = getTotalNumbersArray().slice(min - 1, max);

  const handlePrevPage = () => {
    setSearchParams({
      page: `${+currentPage - 1}`.toString(),
      perPage: perPage,
    });
  };

  const handleNextPage = () => {
    setSearchParams({
      page: `${+currentPage + 1}`.toString(),
      perPage: perPage,
    });
  };

  return (
    <div className="pagination">
      <button
        disabled={+currentPage === 1}
        className={classNames('pagination__button pagination__button--left')}
        onClick={handlePrevPage}
      >
        <img src={Arrow_Left} alt="arrow_left" className="pagination__image" />
      </button>
      {numbersToLoad.map(page => (
        <li
          key={page}
          className={classNames('pagination__item', {
            active: +currentPage === page,
          })}
        >
          <Link
            className={classNames('pagination__link', {
              'pagination__link--is-active': +currentPage === page,
            })}
            to={{
              search: getSearchWith(searchParams, { page: page.toString() }),
            }}
          >
            {page}
          </Link>
        </li>
      ))}
      <button
        disabled={+currentPage === totalPages}
        className={classNames('pagination__button pagination__button--right')}
        onClick={handleNextPage}
      >
        <img
          src={Arrow_Right}
          alt="arrow_right"
          className="pagination__image"
        />
      </button>
    </div>
  );
};
