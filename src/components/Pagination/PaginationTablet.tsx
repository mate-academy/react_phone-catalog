import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../pages/CatalogContext';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { getNumbers } from '../../utils/api';
import { getSearchWith } from '../../utils/searchHelpers';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../images/homePage/Arrow_Right.svg';
import './Pagination.scss';
import React from 'react';

export const PaginationTab = () => {
  const { tablets } = useContext(CatalogContext);
  const [searchParams, setSearchParams] = useSearchParams();

  if (tablets === undefined) {
    return <NotFoundPage />;
  }

  const perPage = searchParams.get('perPage') || '4';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? tablets.length : perPage;

  const total = () => {
    if (perPage === 'all') {
      setSearchParams({
        page: `${1}`.toString(),
        perPage: `${tablets.length}`.toString(),
      });

      return tablets.length;
    } else {
      return Math.ceil(tablets.length / +itemsPerPage);
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
