import { useCallback, useEffect, useState } from 'react';
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
  const [visiblePageNumbers, setVisiblePageNumbers] = useState<number[]>([]);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const tabletPaginationNumbers: number[] = Array.from(
    { length: 13 },
    (_, i) => i + 1,
  );

  const desktopPaginationNumbers: number[] = Array.from(
    { length: 23 },
    (_, i) => i + 1,
  );

  const pageCount = Math.ceil(total / perPage);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let newVisiblePageNumbers: number[] = [];

    if (currentWidth >= 640 && currentWidth < 1200) {
      if (pageCount >= tabletPaginationNumbers.length) {
        newVisiblePageNumbers = tabletPaginationNumbers;
      } else {
        newVisiblePageNumbers = Array.from(
          { length: pageCount },
          (_, i) => i + 1,
        );
      }
    } else if (currentWidth >= 1200) {
      if (pageCount >= desktopPaginationNumbers.length) {
        newVisiblePageNumbers = desktopPaginationNumbers;
      } else {
        newVisiblePageNumbers = Array.from(
          { length: pageCount },
          (_, i) => i + 1,
        );
      }
    } else {
      newVisiblePageNumbers = [1, 2, 3, 4];
    }

    setVisiblePageNumbers(newVisiblePageNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWidth, pageCount]);

  const handleOpenFirstPage = useCallback(() => {
    onPageChange(1);

    const updatedPageNumbers = Array.from(
      { length: visiblePageNumbers.length },
      (_, i) => i + 1,
    );

    setVisiblePageNumbers(updatedPageNumbers);
  }, [onPageChange, visiblePageNumbers]);

  const handleOpenLastPage = useCallback(() => {
    onPageChange(pageCount);
    const firstElement = pageCount - visiblePageNumbers.length + 1;

    const updatedPageNumbers = Array.from(
      { length: visiblePageNumbers.length },
      (_, i) => firstElement + i,
    );

    setVisiblePageNumbers(updatedPageNumbers);
  }, [onPageChange, visiblePageNumbers, pageCount]);

  const handleOpenPrevPage = useCallback(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }

    if (currentPage === visiblePageNumbers[0] && currentPage !== 1) {
      const updatedPageNumbers = [...visiblePageNumbers];

      updatedPageNumbers.unshift(currentPage - 1);
      updatedPageNumbers.pop();

      setVisiblePageNumbers(updatedPageNumbers);
    }
  }, [currentPage, onPageChange, visiblePageNumbers]);

  const handleOpenNextPage = useCallback(() => {
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
  }, [pageCount, currentPage, onPageChange, visiblePageNumbers]);

  return (
    <div className="pagination pagination__content">
      <ul className="pagination__list">
        <li className="pagination__item pagination__sidebutton">
          <button
            type="button"
            data-cy="paginationLeft"
            className={cn('button pagination__back-to-first', {
              'pagination__back-to-first--disabled': currentPage === 1,
            })}
            onClick={handleOpenFirstPage}
            aria-disabled={currentPage === 1}
            aria-label="first"
          >
            {currentPage === 1 ? (
              <img
                src="./icons/icons8-double-left-16-disabled.png"
                alt="arrow-first"
                className="button pagination__back-to-first--img"
              />
            ) : (
              <img
                src="./icons/icons8-double-left-16-active.png"
                alt="arrow-first"
                className="button pagination__back-to-first--img"
              />
            )}
          </button>
        </li>
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

        <div className="pagination__numbers">
          {visiblePageNumbers.map(pageNumber => (
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

        <li className="pagination__item pagination__sidebutton">
          <button
            type="button"
            data-cy="paginationRight"
            className={cn('button pagination__back-to-first', {
              'pagination__back-to-first--disabled': currentPage === pageCount,
            })}
            onClick={handleOpenLastPage}
            aria-disabled={currentPage === pageCount}
            aria-label="last"
          >
            {currentPage === pageCount ? (
              <img
                src="./icons/icons8-double-right-16-disabled.png"
                alt="arrow-first"
                className="button pagination__back-to-first--img"
              />
            ) : (
              <img
                src="./icons/icons8-double-right-16-active.png"
                alt="arrow-first"
                className="button pagination__back-to-first--img"
              />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};
