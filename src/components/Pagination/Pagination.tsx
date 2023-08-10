import { FC } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import './Pagination.scss';

type Props = {
  currentPage: number,
  pageQty: number[];
};

export const Pagination: FC<Props> = ({
  currentPage,
  pageQty,
}) => {
  const [searchParams] = useSearchParams('');

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              page: (currentPage - 1).toString(),
            }),
          }}
          className={classNames('pagination__nav-button square-button', {
            'square-button--disabled': currentPage === 1,
          })}
          data-cy="paginationLeft"
        >
          <img src="icons/leftArrow.svg" alt="previous button" />
        </Link>
      </li>
      {pageQty.map(pageNumber => (
        <li
          key={pageNumber}
          className="pagination__item"
        >
          <Link
            to={{
              search: getSearchWith(searchParams, {
                page: pageNumber.toString(),
              }),
            }}
            className={classNames('pagination__page-button square-button', {
              'square-button--selected': pageNumber === currentPage,
            })}
          >
            {pageNumber}
          </Link>
        </li>
      ))}
      <li className="pagination__item">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              page: (currentPage + 1).toString(),
            }),
          }}
          className={classNames('pagination__nav-button square-button', {
            'square-button--disabled': currentPage === pageQty.length,
          })}
          data-cy="paginationRight"
        >
          <img src="icons/rightArrow.svg" alt="next button" />
        </Link>
      </li>
    </ul>
  );
};
