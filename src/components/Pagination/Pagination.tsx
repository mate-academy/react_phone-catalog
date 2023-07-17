import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import './Pagination.scss';

type Props = {
  productsAmount: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  productsAmount, perPage, currentPage,
}) => {
  const [searchParams] = useSearchParams('');
  const pagesAmount = () => (perPage ? Math.ceil(productsAmount / perPage) : 0);

  const pagesList = (pagesAmount() > 1)
    ? (Array.from(
      { length: pagesAmount() },
      (_, i) => i + 1,
    ))
    : [1];

  return (
    <div className="pagination" data-cy="pagination">
      <Link
        data-cy="paginationLeft"
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage - 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          {
            'pagination__item--disabled': currentPage === pagesList[0],
          },
        )}
      >
        <img src="./img/ArrowLeft.svg" alt="arrowLeft" />
      </Link>

      <ul className="pagination__list">
        {pagesList.map((n) => {
          const numberPage = n.toString();

          return (
            <li key={numberPage} className="pagination__item">
              <Link
                to={{
                  search: getSearchWith(searchParams, { page: numberPage }),
                }}
                className={classNames(
                  'pagination__link',
                  {
                    'pagination__link--active': currentPage === n,
                  },
                )}
              >
                {numberPage}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        data-cy="paginationRight"
        to={{
          search: getSearchWith(searchParams, {
            page: (currentPage + 1).toString(),
          }),
        }}
        className={classNames(
          'pagination__item',
          {
            'pagination__item--disabled':
            currentPage === pagesList[pagesList.length - 1],
          },
        )}
      >
        <img src="./img/ArrowRight.svg" alt="arrowRigth" />
      </Link>
    </div>
  );
};
