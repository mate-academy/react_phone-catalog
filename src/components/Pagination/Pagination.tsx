import './Pagination.scss';
import classNames from 'classnames';
import { getNumbers } from '../../helpers/getNumbers';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagintaion: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  return (
    <ul className="Pagination" data-cy="pagination">
      <li className={classNames(
        'Pagination__item',
        { disabled: currentPage === 1 },
      )}
      >
        <SearchLink
          data-cy="paginationLeft"
          className="Pagination__link Pagination__link--prev"
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
          params={{ page: `${currentPage + 1}` }}
        />
      </li>
    </ul>
  );
};
