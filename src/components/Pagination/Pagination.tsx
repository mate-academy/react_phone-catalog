import './Pagination.scss';
import classNames from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers, getSearchWith } from '../../utils/helper';

import arrow from '../../images/icons/disable_arrow.png';
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
    return classNames('pagination__page', {
      pagination__selectedPage: number === +selectedPage,
    });
  };

  const changePage = (value: string) => {
    const currentPage = searchParams.get('page');
    const count = currentPage && +currentPage ? +currentPage : +defaultPage;

    switch (value) {
      case 'prev':
        return getSearchWith(searchParams, { page: (count - 1).toString() });
      case 'next':
        return getSearchWith(searchParams, { page: (count + 1).toString() });

      default:
        return searchParams;
    }
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
        className="pagination__button pagination__button-left"
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
          { search: changePage('next').toString(), }
        }
        className="pagination__button pagination__button-right"
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
