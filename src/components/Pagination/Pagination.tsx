import './Pagination.scss';
import cn from 'classnames';

export type Props = {
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
  const pageCount = Math.ceil(total / perPage);

  const pageNumbers: number[] = Array.from(
    { length: pageCount },
    (_, i) => i + 1,
  );

  const handleOpenPrevPage = () =>
    currentPage !== 1 && onPageChange(currentPage - 1);

  const handleOpenNextPage = () =>
    currentPage !== pageCount && onPageChange(currentPage + 1);

  return (
    <div className="pagination pagination__content">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            type="button"
            data-cy="paginationLeft"
            className={cn('button pagination__link', 'pagination__link--left', {
              'pagination__link--left--disabled': currentPage === 1,
            })}
            onClick={handleOpenPrevPage}
            aria-disabled={currentPage === 1}
            aria-label="prev"
          />
        </li>
        <div className="pagination__numbers">
          {pageNumbers.map(pageNumber => (
            <li
              key={pageNumber}
              className={cn('pagination__item', {
                'pagination__item--active': pageNumber === currentPage,
              })}
            >
              <button
                type="button"
                data-cy="pageLink"
                className={cn('button pagination__number', {
                  'pagination__number--active': pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </div>
        <li className="pagination__item">
          <button
            type="button"
            data-cy="paginationRight"
            className={cn('button pagination__link', {
              'pagination__link--disabled': currentPage === pageCount,
            })}
            onClick={handleOpenNextPage}
            aria-disabled={currentPage === pageCount}
            aria-label="next"
          />
        </li>
      </ul>
    </div>
  );
};
