import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  totalItems: number
  itemsPerPage: number
};

export const Pagination: React.FC<Props> = (
  {
    totalItems,
    itemsPerPage,
  },
) => {
  const pageNumbers = [];
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav className="pagination is-centered" role="navigation">
        <ul className="pagination-list">
          <li>
            <SearchLink
              className={classNames(
                'pagination-previous', { 'is-disabled': +page === 1 },
              )}
              params={{ page: (+page - 1).toString() }}
            >
              «
            </SearchLink>
          </li>
          {pageNumbers.map(pageNumber => (
            <li
              key={pageNumber}
            >
              <SearchLink
                className={classNames(
                  'pagination-link',
                  {
                    'has-background-dark has-text-white':
                      pageNumber === +page,
                  },
                )}
                params={{ page: pageNumber.toString() }}
              >
                {pageNumber}
              </SearchLink>
            </li>
          ))}
          <li>
            <SearchLink
              className={classNames('pagination-next',
                { 'is-disabled': +page === pageNumbers.length })}
              params={{ page: (+page + 1).toString() }}
            >
              »
            </SearchLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
