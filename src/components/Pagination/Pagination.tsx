import './Pagination.scss';

import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { getNumbers } from '../../helpers/getNumbers';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(total / perPage);
  const numberOfPages = getNumbers(1, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <>
      <div className="pagination">
        <Link
          data-cy="prevLink"
          className={classNames(
            'pagination__item',
            'button-square',
            {
              'button-square--disabled': isFirstPage,
            },
          )}
          to={{
            search: getSearchWith(
              searchParams,
              { page: (currentPage - 1).toString() },
            ),
          }}
          aria-disabled={isFirstPage}
        >
          <img src="_new/img/icons/arrow_left.svg" alt="arrow left" />
        </Link>

        <ul className="pagination__list">
          {numberOfPages.map((number) => (
            <li
              key={number}
              className="pagination__item"
            >
              <Link
                data-cy="pageLink"
                className={classNames(
                  'pagination__link',
                  {
                    'pagination__link--active': number === currentPage,
                  },
                )}
                to={{
                  search: getSearchWith(
                    searchParams,
                    { page: number.toString() },
                  ),
                }}
              >
                {number}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          data-cy="nextLink"
          className={classNames(
            'pagination__item',
            'button-square',
            {
              'button-square--disabled': isLastPage,
            },
          )}
          to={{
            search: getSearchWith(
              searchParams,
              { page: (currentPage + 1).toString() },
            ),
          }}
          aria-disabled={isLastPage}
        >
          <img src="_new/img/icons/arrow_right.svg" alt="arrow right" />
        </Link>
      </div>
    </>
  );
};
