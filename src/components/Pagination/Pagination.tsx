import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { updateSearchParams } from '../../helpers/searchHelper';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRigth from '../../assets/svg/arrowRigth.svg';
import './pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: FC<Props> = ({ total, perPage, currentPage }) => {
  const [searchParams] = useSearchParams('');
  const lastPage = Math.ceil(total / perPage);
  const numberOfPages: number[]
  = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <Link
        to={{
          search: updateSearchParams(searchParams, {
            page: (currentPage - 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          'button-square',
          {
            'button-square--disabled': currentPage === numberOfPages[0],
          },
        )}
      >
        <img src={arrowLeft} alt="arrowLeft" />
      </Link>

      <ul className="pagination__list">
        {numberOfPages.map((n) => {
          return (
            <li key={n} className="pagination__item">
              <Link
                to={{
                  search: updateSearchParams(searchParams, {
                    page: n.toString(),
                  }),
                }}
                className={classNames(
                  'pagination__link',
                  {
                    'pagination__link--active': currentPage === n,
                  },
                )}
              >
                {n}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to={{
          search: updateSearchParams(searchParams, {
            page: (currentPage + 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          'button-square',
          {
            'button-square--disabled':
            currentPage === numberOfPages[numberOfPages.length - 1],
          },
        )}
      >
        <img src={arrowRigth} alt="arrowRigth" />
      </Link>
    </div>
  );
};
