import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers, getSearchWith } from '../../helpers/searchWith';

import './Pagination.scss';

type Props = {
  total: number,
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(total / +perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePageChange = (pageNumber: number) => {
    return getSearchWith(searchParams, {
      page: String(pageNumber) || null,
    });
  };

  return (
    <div className="pagination">
      <div>
        <Link
          data-cy="prevLink"
          className={classNames('pagination__link', { disabled: firstPage })}
          aria-disabled={firstPage}
          to={{
            search: !firstPage ? handlePageChange(currentPage - 1) : undefined,
          }}
        >
          {'<'}
        </Link>
      </div>

      <div className="pagination__pages">
        {getNumbers(1, pageCount).map((pageNumber) => (
          <div
            key={pageNumber}
            className={classNames('pagination__item', {
              active: pageNumber === currentPage,
            })}
          >
            <Link
              data-cy="pageLink"
              className={classNames('pagination__link', {
                active: pageNumber === currentPage,
              })}
              to={{
                search:
                  currentPage !== pageNumber
                    ? handlePageChange(pageNumber)
                    : undefined,
              }}
              onClick={(e) => {
                if (currentPage === pageNumber) {
                  e.preventDefault();
                }
              }}
            >
              {pageNumber}
            </Link>
          </div>
        ))}
      </div>

      <div>
        <Link
          data-cy="nextLink"
          className={classNames('pagination__link', { disabled: lastPage })}
          aria-disabled={lastPage}
          to={{
            search: !lastPage ? handlePageChange(currentPage + 1) : undefined,
          }}
        >
          {'>'}
        </Link>
      </div>
    </div>
  );
};
