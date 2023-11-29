import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';
import './Pagination.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const isCurrentFirst = currentPage === 1;
  const isCurrentLast = currentPage === lastPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('pagination__item', { disabled: isCurrentFirst })}
      >
        <Link
          data-cy="prevLink"
          className="pagination__link"
          to={`#../${pages[currentPage - 1]}`}
          aria-disabled={isCurrentFirst}
          onClick={() => {
            if (!isCurrentFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </Link>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={classNames('pagination__item',
            { active: page === currentPage })}
        >
          <Link
            data-cy="pageLink"
            className="pagination__link"
            to={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Link>
        </li>
      ))}

      <li className={classNames('pagination__item',
        { disabled: isCurrentLast })}
      >
        <Link
          data-cy="nextLink"
          className="pagination__link"
          to={`#${pages[currentPage + 1]}`}
          aria-disabled={isCurrentLast}
          onClick={() => {
            if (!isCurrentLast) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
