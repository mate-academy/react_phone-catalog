import './Pagination.scss';
import { useMemo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '@/helpers/getNumbers';
import { SearchLink } from '@/components/SearchLink';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

enum CurrentPage {
  First = 1,
}

export const Pagintaion: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const numberOfPages = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const pages = useMemo(() => {
    return getNumbers(1, numberOfPages);
  }, [numberOfPages]);

  return (
    <ul className="Pagination" data-cy="pagination">
      <li className={classNames(
        'Pagination__item',
        { disabled: currentPage === CurrentPage.First },
      )}
      >
        <SearchLink
          data-cy="paginationLeft"
          className="Pagination__link Pagination__link--prev"
          aria-label="pagination-left"
          params={{ page: `${currentPage - 1}` }}
        />
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'Pagination__item',
            { active: currentPage === page },
          )}
        >
          <SearchLink
            className="Pagination__link"
            params={{ page: `${page}` }}
          >
            {page}
          </SearchLink>
        </li>
      ))}
      <li className={classNames(
        'Pagination__item',
        { disabled: currentPage === numberOfPages },
      )}
      >
        <SearchLink
          data-cy="paginationRight"
          className="Pagination__link Pagination__link--next"
          aria-label="pagination-right"
          params={{ page: `${currentPage + 1}` }}
        />
      </li>
    </ul>
  );
};
