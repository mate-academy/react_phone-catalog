import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getNumbers } from './getNumbers';
import './pagination.scss';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const quantityPages = Math.ceil(total / perPage);

  const pagesToShow = 4;
  const halfPagesToShow = Math.floor(pagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  const endPage = Math.min(quantityPages, startPage + pagesToShow - 1);

  if (endPage === quantityPages) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  const handlePageChange = (
    page: number,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    onPageChange(page);
  };

  const handlePrevPage = () => {
    setSearchParams(getSearchWith(
      searchParams, { page: (currentPage - 1).toString() },
    ));
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setSearchParams(getSearchWith(
      searchParams, { page: (currentPage + 1).toString() },
    ));
    if (currentPage < quantityPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <ul className="pagination__list">
        <li className="pagination__page">
          <button
            type="button"
            aria-label="back"
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          />
        </li>
        {getNumbers(startPage, endPage).map(page => (
          <li className="pagination__page" key={page}>
            <a
              className={cn('pagination__link',
                { 'pagination__link-active': page === currentPage })}
              href={`#${page}`}
              onClick={(event) => handlePageChange(page, event)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="pagination__page">
          <button
            type="button"
            aria-label="forward"
            className="pagination-arrow pagination-arrow-next"
            onClick={handleNextPage}
            disabled={currentPage === quantityPages}
          />
        </li>
      </ul>
    </div>
  );
};
