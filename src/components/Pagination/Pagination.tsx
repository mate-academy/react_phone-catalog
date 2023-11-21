import './Pagination.scss';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

interface Props {
  total: number;
  perPage: string;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const lastPage = Math.ceil(total / +perPage);
  const allPagesCount = Math.ceil(total / +perPage);

  function getFromPage() {
    let from = 1;

    if (currentPage > 3) {
      from = currentPage - 1;

      if (currentPage + 2 > allPagesCount) {
        from = allPagesCount - 3;
      }
    }

    return from;
  }

  function getToPage() {
    let to = allPagesCount;

    if (currentPage + 2 < allPagesCount) {
      to = currentPage + 1;

      if (currentPage < 3) {
        to = 4;
      }
    }

    return to;
  }

  const fromPage = getFromPage();
  const toPage = getToPage();

  const currentPageNumbers = getNumbers(
    fromPage,
    toPage,
  );

  return (
    <>
      <div
        className="pagination"
        data-cy="pagination"
      >
        <div className="pagination__buttons-container">
          <SearchLink
            params={{ page: (currentPage - 1).toString() }}
          >
            <button
              data-cy="paginationLeft"
              className="pagination__arrow-item"
              type="button"
              disabled={currentPage === 1}
            >
              <ReactSVG
                src="img/icons/Chevron (Arrow Left).svg"
              />
            </button>
          </SearchLink>

          {currentPage > 3 && (
            <>
              <SearchLink
                params={{ page: '1' }}
                data-cy="pageLink"
                className="page-link"
              >
                <button
                  className={classNames(
                    'pagination__page-item',
                  )}
                  type="button"
                >
                  1
                </button>
              </SearchLink>

              <p>...</p>
            </>
          )}

          {currentPageNumbers.map((page) => (
            <SearchLink
              params={{ page: page.toString() }}
              data-cy="pageLink"
              className="page-link"
              key={page}
            >
              <button
                key={page}
                className={classNames(
                  'pagination__page-item',
                  { 'pagination__page-item--active': currentPage === page },
                )}
                type="button"
              >
                {page}
              </button>
            </SearchLink>
          ))}

          {currentPage + 2 < allPagesCount && (
            <>
              <p>...</p>

              <SearchLink
                params={{ page: allPagesCount.toString() }}
                data-cy="pageLink"
                className="page-link"
              >
                <button
                  className={classNames(
                    'pagination__page-item',
                  )}
                  type="button"
                >
                  {allPagesCount}
                </button>
              </SearchLink>
            </>
          )}

          <SearchLink
            params={{ page: (currentPage + 1).toString() }}
          >
            <button
              data-cy="paginationRight"
              className="pagination__arrow-item"
              type="button"
              disabled={currentPage === lastPage}
            >
              <ReactSVG
                src="img/icons/Chevron (Arrow Right).svg"
              />
            </button>
          </SearchLink>
        </div>
      </div>
    </>
  );
};
