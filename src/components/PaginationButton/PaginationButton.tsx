import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import './PaginationButton.scss';

type Props = {
  total: number;
  itemOnPage: number;
  currentPage: number;
  setCurrentPage:(page: number) => void;
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const PaginationButton: React.FC<Props> = ({
  total, setCurrentPage, currentPage, itemOnPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const itemOnPage = +(searchParams.get('itemOnPage ') || 4);
  // const currentPage = +(searchParams.get('currentPage') || 1);
  const pages = getNumbers(1, Math.ceil(total / itemOnPage)).map(page => page);
  const handlePageChange = (page: number) => () => {
    if (page !== currentPage && page > 0 && page <= pages.length) {
      const params = new URLSearchParams(searchParams);

      params.set('currentPage', 'page');
      setSearchParams(params);
      setCurrentPage(page);
    }
  };

  return (
    <ul className="pagination__button">
      <li className={cn('pagination__item', { disabled: currentPage === 1 })}>
        <Link
          data-cy="prevLink"
          className="pagination__link"
          to="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePageChange(currentPage - 1)}
        >
          «
        </Link>
      </li>
      {pages.map((page) => (
        <li
          className={cn('pagination__item', {
            'pagination__item-active': page === currentPage,
          })}
          key={page}
        >
          <Link
            data-cy="pageLink"
            className={cn('pagination__link', {
              'pagination__link-active': page === currentPage,
            })}
            to={`#${page}`}
            onClick={handlePageChange(page)}
          >
            {`${page}`}
          </Link>
        </li>
      ))}

      <li className={cn('pagination__item', {
        disabled: currentPage === pages.length,
      })}
      >
        <Link
          data-cy="nextLink"
          className="pagination__link"
          to="#next"
          aria-disabled={currentPage === pages.length}
          onClick={handlePageChange(currentPage + 1)}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
