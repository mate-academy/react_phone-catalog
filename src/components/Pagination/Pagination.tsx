import { FC } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRight from '../../assets/svg/arrowRight.svg';
import { getSearchWith } from '../../helpers/searchHelper';

import './pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams('');
  const lastPage = Math.ceil(total / perPage);
  const numberOfPages = [];

  for (let i = 1; i <= lastPage; i += 1) {
    numberOfPages.push(i.toString());
  }

  return (
    <div className="pagination">
      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage - 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          'button-square',
          {
            'button-square--disabled': currentPage === +numberOfPages[0],
          },
        )}
      >
        <img src={arrowLeft} alt="Arrow Left" />
      </Link>

      <ul className="pagination__list">
        {numberOfPages.map(n => (
          <li className="pagination__item" key={n}>
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  page: n,
                }),
              }}
              className={classNames(
                'pagination__link',
                { 'pagination__link--active': currentPage === +n },
              )}
            >
              {+n}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage + 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          'button-square',
          {
            'button-square--disabled': currentPage === lastPage,
          },
        )}
      >
        <img src={arrowRight} alt="Arrow Right" />
      </Link>
    </div>
  );
};
