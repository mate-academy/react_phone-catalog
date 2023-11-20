import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/SearchHelper';

type Props = {
  phonesPerPage: number;
  totalPhones: number;
};

export const Pagination: React.FC<Props> = ({
  phonesPerPage,
  totalPhones,
}) => {
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const pageNumber: number[] = [];

  const amountPage = Math.ceil(totalPhones / phonesPerPage);

  for (let i = 1; i <= amountPage; i += 1) {
    pageNumber.push(i);
  }

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <Link
        to={{
          search: getSearchWith(
            searchParams,
            {
              page: `${currentPage - 1}`,
            },
          ),
        }}
        className={classNames(
          'pagination__arrow',
          { 'pagination__arrow--disable': currentPage === 1 },
        )}
        data-cy="paginationLeft"
      >
        {currentPage !== 1
          ? (
            <img src="./images/icons/ArrowLeft.svg" alt="prev page" />
          )
          : (
            <img src="./images/icons/ArrowLeftDisabled.svg" alt="prev page" />
          )}
      </Link>

      <ul className="pagination__list">
        {
          pageNumber.map(page => (
            <li className="pagination__li" key={page}>
              <Link
                to={
                  {
                    search: getSearchWith(
                      searchParams,
                      {
                        page: `${page}`,
                      },
                    ),
                  }
                }
                className={classNames(
                  'pagination__link',
                  {
                    'pagination__link--active': currentPage === page,
                  },
                )}
              >
                {page}
              </Link>
            </li>
          ))
        }
      </ul>

      <Link
        to={{
          search: getSearchWith(
            searchParams,
            {
              page: `${currentPage + 1}`,
            },
          ),
        }}
        className={classNames(
          'pagination__arrow',
          {
            'pagination__arrow--disable': currentPage === pageNumber.length,
          },
        )}
        data-cy="paginationRight"
      >
        {currentPage !== pageNumber.length
          ? (
            <img src="./images/icons/ArrowRight.svg" alt="prev page" />
          )
          : (
            <img src="./images/icons/ArrowRightDisabled.svg" alt="prev page" />
          )}
      </Link>
    </div>
  );
};
