/* eslint-disable @typescript-eslint/ban-ts-comment */
import './Pagination.scss';
import cn from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers, getSearchWith } from '../../utils/helper';

// @ts-ignore
import arrow from '../../images/icons/disable_arrow.png';
// @ts-ignore
import blackArrow from '../../images/icons/arrow-black.svg';

type Props = {
  totalNumbersOfItems: number;
  itemsPerPage: number
};

const defaultPage = '1';

export const Pagination: React.FC<Props> = ({
  totalNumbersOfItems, itemsPerPage,
}) => {
  const [searchParams] = useSearchParams();
  const selectedPage = searchParams.get('page') || defaultPage;
  const amountOfPages = Math.ceil(totalNumbersOfItems / itemsPerPage);
  const pages = getNumbers(1, amountOfPages);

  const getPageClassName = (number: number) => {
    return cn('pagination__page', {
      pagination__selectedPage: number === +selectedPage,
    });
  };

  const changePage = (value: string) => {
    const currentPage = searchParams.get('page');
    const count = currentPage && +currentPage ? +currentPage : +defaultPage;

    switch (value) {
      case 'prev':
        if (currentPage && currentPage !== '1') {
          return getSearchWith(searchParams, { page: (count - 1).toString() });
        }

        break;
      case 'next':
        if (currentPage && currentPage !== amountOfPages.toString()) {
          return getSearchWith(searchParams, { page: (count + 1).toString() });
        }

        break;
      default:
        return searchParams;
    }

    return '';
  };

  return (
    <div
      data-cy="pagination"
      className="pagination"
    >
      <Link
        to={{
          search: changePage('prev').toString(),
        }}
        className={cn('pagination__button pagination__button-left', {
          'pagination__button-invalid': selectedPage === '1',
        })}
      >
        <img
          src={arrow}
          alt="arrow_left"
          className="pagination__icon-left"
        />
      </Link>
      <div className="pagination__pages">
        {pages.map(number => (
          <Link
            to={
              {
                search: getSearchWith(searchParams,
                  { page: number.toString() }),
              }
            }
            key={number}
            className={getPageClassName(number)}
          >
            {number}
          </Link>
        ))}
      </div>
      <Link
        to={
          { search: changePage('next').toString() }
        }
        className={cn('pagination__button pagination__button-right',
          {
            'pagination__button-invalid':
            selectedPage === amountOfPages.toString(),
          })}
      >
        <img
          src={blackArrow}
          alt="arrow_right"
          className="pagination__icon"
        />
      </Link>
    </div>
  );
};
