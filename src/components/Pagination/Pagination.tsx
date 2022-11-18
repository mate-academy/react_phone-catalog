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

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const prevPage = (+page - (+page > 1 ? 1 : 0)).toString();
  const nextPage = (+page + (+page < pageNumbers.length ? 1 : 0)).toString();
  const prevDisabled = +page === 1;
  const nextDisabled = +page === pageNumbers.length;

  return (
    <>
      <nav className="pagination is-centered" role="navigation">
        <ul className="pagination-list">
          <li>
            <SearchLink
              className={classNames(
                'pagination-previous', { 'is-disabled': prevDisabled },
              )}
              params={{ page: prevPage }}
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
                { 'is-disabled': nextDisabled })}
              params={{ page: nextPage }}
            >
              »
            </SearchLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
