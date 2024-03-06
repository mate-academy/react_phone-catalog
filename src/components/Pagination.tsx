import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers } from '../helpers/ProductMethods';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '4';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? total : perPage;
  const totalPages = Math.ceil(total / +itemsPerPage);
  const getTotalNumbersArray = (): number[] => {
    return getNumbers(1, totalPages);
  };

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={cn('page-item', { disabled: +currentPage === 1 })}>
        {+currentPage === 1 ? (
          <span className="page-link disabled"> &#10094;</span>
        ) : (
          <Link
            className="page-link"
            data-cy="paginationLeft"
            to={{
              search: getSearchWith(searchParams, {
                page: (+currentPage - 1).toString(),
              }),
            }}
          >
            &#10094;
          </Link>
        )}
      </li>

      <div className="pagination__links">
        {getTotalNumbersArray().map((page) => (
          <li className={cn('page-item', { active: +currentPage === page })}>
            <Link
              key={page}
              className={cn('page-link', {
                'is-active': +currentPage === page,
              })}
              to={{
                search: getSearchWith(searchParams, { page: page.toString() }),
              }}
            >
              {page}
            </Link>
          </li>
        ))}
      </div>
      <li
        className={cn('page-item', { disabled: +currentPage === totalPages })}
      >

        {+currentPage === totalPages ? (
          <span className="page-link disabled"> &#10095;</span>
        ) : (
          <Link
            data-cy="paginationRight"
            className="page-link"
            to={{
              search: getSearchWith(searchParams, {
                page: (+currentPage + 1).toString(),
              }),
            }}
          >
            &#10095;
          </Link>
        )}
      </li>
    </ul>
  );
};
