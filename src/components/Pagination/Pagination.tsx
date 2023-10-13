import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { QueryParams } from '../../types/QueryParams';
import { getPageNumbers } from '../../utils/productsHelper';
import { getSearchWith } from '../../utils/searchHelper';
import './Pagination.scss';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get(QueryParams.Page) || 1);
  const perPage = searchParams.get(QueryParams.PerPage) || '16';

  const pagesCount = perPage === 'all' ? 1 : Math.ceil(total / +perPage);
  const pages = getPageNumbers(1, pagesCount);

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= pagesCount) {
      const search = getSearchWith(searchParams, { page: newPage.toString() });

      setSearchParams(search);
    }
  };

  return (
    <div className="Pagination" data-cy="pagination">
      <button
        type="button"
        aria-label="Previous"
        className="button button--prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        data-cy="paginationLeft"
      />

      <ul className="Pagination__pages">
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              onClick={() => handlePageChange(page)}
              className={cn('button', {
                'button--active': currentPage === page,
              })}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Next"
        className="button button--next"
        disabled={currentPage === pagesCount}
        onClick={() => handlePageChange(currentPage + 1)}
        data-cy="paginationRight"
      />
    </div>
  );
};
