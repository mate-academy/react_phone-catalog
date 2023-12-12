/* eslint-disable react/button-has-type */
import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import {
  SearchParams,
  getSearchWith,
} from '../../helpers/getFunctions/searchHelper';
import './PageControl.scss';

type Props = {
  length: number,
};

export const PageControl: React.FC<Props> = ({ length }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const itemsNumber = searchParams.get('itemsOnPage') || '16';
  const page = searchParams.get('page') || '1';

  const countPages = Math.ceil(length / +itemsNumber)
    || false;

  const getVisblePages = () => {
    const pages: number[] = [];

    if (!countPages) {
      return pages;
    }

    for (let i = 1; i <= countPages; i += 1) {
      pages.push(i);
    }

    if (+page >= 4 && +page !== pages.length) {
      return pages.slice(+page - 3, +page + 1);
    }

    if (+page === pages.length) {
      return pages.slice(pages.length - 4, pages.length);
    }

    return pages.slice(0, 4);
  };

  const toTopPage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBtnPrevPage = () => {
    setSearchWith({ page: `${+page - 1}` });
    toTopPage();
  };

  const handleBtnNextPage = () => {
    setSearchWith({ page: `${+page + 1}` });
    toTopPage();
  };

  const handleBtnPage = (currentPage: number) => {
    setSearchWith({ page: `${currentPage}` });
    toTopPage();
  };

  const visblePages = getVisblePages();

  return (
    <div className="page-controls">
      <button
        onClick={handleBtnPrevPage}
        className={classNames(
          'page-controls__btn-control-page',
          'button',
          { 'button--disable': +page === 1 },
        )}
        disabled={+page === 1}
      >
        <div className="icon icon__arrow-primary" />
      </button>

      <ul className="page-controls__pages-list">
        {visblePages.map(pageValue => (
          <li
            key={getUniqueId()}
            className="page-controls__page-item"
          >
            <button
              onClick={() => handleBtnPage(pageValue)}
              className={classNames(
                'page-controls__btn-page',
                'button',
                {
                  'page-controls__btn-page--active':
                    +page === pageValue,
                },
              )}
            >
              {pageValue}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleBtnNextPage}
        className={classNames(
          'page-controls__btn-control-page',
          'button',
          { 'button--disable': +page === countPages },
        )}
        disabled={countPages === +page}
      >
        <div
          className="
          icon icon__arrow-primary
          icon__arrow-primary--rigth
        "
        />
      </button>
    </div>
  );
};
