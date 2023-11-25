import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: string) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const getPaginationNumbers = (from: number, to: number): number[] => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  const pagesCount = getPaginationNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  const PrevNextPage = (direction: string) => {
    if (!isLastPage && direction === 'next') {
      onPageChange(`${currentPage + 1}`);
    }

    if (!isFirstPage && direction === 'prev') {
      onPageChange(`${currentPage - 1}`);
    }
  };

  return (
    <ul className="pagination" data-cy="pagination">

      <li>
        <button
          type="button"
          data-cy="paginationLeft"
          className="pagination__button"
          aria-disabled={isFirstPage}
          onClick={() => PrevNextPage('prev')}
          disabled={isFirstPage}
        >
          {'<'}
        </button>
      </li>

      {
        pagesCount.map(page => (
          <li key={page}>
            <Link
              to={{
                search: getSearchWith(searchParams, { page: `${page}` }),
              }}
              className={
                classNames('pagination__links',
                  { 'pagination__links-isActive': currentPage === page })
              }
              onClick={() => onPageChange(`${page}`)}
            >
              {page}
            </Link>
          </li>
        ))
      }

      <li>
        <button
          type="button"
          data-cy="paginationRight"
          className="pagination__button"
          aria-disabled={isLastPage}
          onClick={() => PrevNextPage('next')}
          disabled={isLastPage}
        >
          {'>'}
        </button>
      </li>

    </ul>
  );
};
