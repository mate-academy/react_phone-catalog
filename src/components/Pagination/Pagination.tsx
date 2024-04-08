import { useCallback, useState } from 'react';
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
  const [visiblePageNumbers, setVisiblePageNumbers] = useState([1, 2, 3]);

  const pageCount = Math.ceil(total / perPage);

  const pageNumbers: number[] = Array.from(
    { length: pageCount },
    (_, i) => i + 1,
  );

  const handleOpenPrevPage = () =>
    currentPage !== 1 && onPageChange(currentPage - 1);

  const handleOpenPrevPageMobile = useCallback(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  }, []);

  const handleOpenNextPage = () => {
    if (currentPage !== pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleOpenNextPageMobile = useCallback(() => {
    if (currentPage !== pageCount) {
      onPageChange(currentPage + 1);
    }

    if (
      currentPage === visiblePageNumbers[visiblePageNumbers.length - 1] &&
      currentPage !== pageCount
    ) {
      const updatedPageNumbers = [...visiblePageNumbers];

      updatedPageNumbers.push(currentPage + 1);
      updatedPageNumbers.shift();
      setVisiblePageNumbers(updatedPageNumbers);
    }
  }, [pageCount, visiblePageNumbers, currentPage, onPageChange]);

  return (
    <div className="pagination pagination__content">
      <ul className="pagination__list">
        <li className="pagination__item pagination__sidebutton">
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

        <li className="pagination__item pagination__sidebutton--mobile">
          <button
            type="button"
            data-cy="paginationLeft"
            className={cn('button pagination__link', 'pagination__link--left', {
              'pagination__link--left--disabled': currentPage === 1,
            })}
            onClick={handleOpenPrevPageMobile}
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

        <div className="pagination__numbers--mobile">
          {currentPage >= pageCount / 2 && (
            <>
              <div
                className={cn('pagination__item', {
                  'pagination__item--active': pageCount === currentPage,
                })}
              >
                <button
                  type="button"
                  data-cy="pageLink"
                  className={cn('button pagination__number', {
                    'pagination__number--active': pageCount === currentPage,
                  })}
                  onClick={() => onPageChange(pageCount)}
                >
                  {1}
                </button>
              </div>
              <p className="padination__dots">...</p>
            </>
          )}

          {visiblePageNumbers.map(visibleNumber => (
            <li
              key={visibleNumber}
              className={cn('pagination__item', {
                'pagination__item--active': visibleNumber === currentPage,
              })}
            >
              <button
                type="button"
                data-cy="pageLink"
                className={cn('button pagination__number', {
                  'pagination__number--active': visibleNumber === currentPage,
                })}
                onClick={() => onPageChange(visibleNumber)}
              >
                {visibleNumber}
              </button>
            </li>
          ))}

          {currentPage < pageCount / 2 && (
            <>
              <p className="padination__dots">...</p>
              <div
                className={cn('pagination__item', {
                  'pagination__item--active': pageCount === currentPage,
                })}
              >
                <button
                  type="button"
                  data-cy="pageLink"
                  className={cn('button pagination__number', {
                    'pagination__number--active': pageCount === currentPage,
                  })}
                  onClick={() => onPageChange(pageCount)}
                >
                  {pageNumbers[pageNumbers.length - 1]}
                </button>
              </div>
            </>
          )}
        </div>

        <li className="pagination__item pagination__sidebutton">
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

        <li className="pagination__item pagination__sidebutton--mobile">
          <button
            type="button"
            data-cy="paginationRight"
            className={cn('button pagination__link', {
              'pagination__link--disabled': currentPage === pageCount,
            })}
            onClick={handleOpenNextPageMobile}
            aria-disabled={currentPage === pageCount}
            aria-label="next"
          />
        </li>
      </ul>
    </div>
  );
};
