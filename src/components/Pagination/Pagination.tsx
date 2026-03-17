import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { icons } from '../../utils/icons';

type Props = {
  totalItems: number;
};

export const Pagination: React.FC<Props> = ({ totalItems }) => {
  const [searchParams] = useSearchParams();

  // читаємо з URL
  const currentPage = Number(searchParams.get('page')) || 1;

  const perPageFromUrl = searchParams.get('perPage');
  const itemsPerPage: number | 'all' =
    perPageFromUrl === null ? 'all' : Number(perPageFromUrl);

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const VISIBLE_PAGES = 4;

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > VISIBLE_PAGES) {
    if (currentPage <= 2) {
      startPage = 1;
      endPage = VISIBLE_PAGES;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - (VISIBLE_PAGES - 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const buildSearch = (page: number) => {
    const params = new URLSearchParams();

    if (page !== 1) {
      params.set('page', String(page));
    }

    if (itemsPerPage !== 'all') {
      params.set('perPage', String(itemsPerPage));
    }

    const query = params.toString();

    return query ? `?${query}` : '';
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('pagination--item--arrow', {
          disabled: currentPage === 1,
        })}
      >
        {currentPage === 1 ? (
          <span className="pagination--link page-arrow">
            <img src={icons.arrowIconLeft} alt="arrowleft" />
          </span>
        ) : (
          <Link
            className="page-link page-arrow"
            to={buildSearch(currentPage - 1)}
          >
            <img src={icons.arrowIconLeftHover} alt="arrowleft" />
          </Link>
        )}
      </li>
      {pages.map(page => (
        <ul
          key={page}
          className={classNames('pagination__numbers', {
            active: page === currentPage,
            isSelected: page === currentPage,
          })}
        >
          <li
            className={classNames('pagination--item', {
              active: page === currentPage,
              isSelected: page === currentPage,
            })}
          >
            <Link
              className={classNames('pagination--link', {
                active: page === currentPage,
                isSelected: page === currentPage,
              })}
              to={buildSearch(page)}
            >
              {page}
            </Link>
          </li>
        </ul>
      ))}
      <li
        className={classNames('pagination--item', {
          disabled: currentPage === totalPages,
        })}
      >
        {currentPage === totalPages ? (
          <span className="pagination--link">
            <img src={icons.arrowIconRight} alt="" />
          </span>
        ) : (
          <Link className="pagination--link" to={buildSearch(currentPage + 1)}>
            <img src={icons.arrowIconRightHover} alt="" />
          </Link>
        )}
      </li>
    </ul>
  );
};
