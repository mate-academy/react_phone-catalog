/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { normalizeUrlParams }
  from '../../helpers/funcService/normalizeUrlParams';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { getStartPage } from '../../helpers/funcService/getStartPage';
import { getEndPage } from '../../helpers/funcService/getEndPage';
import './Pagination.scss';

type Props = {
  totalItems: number;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = Array.from(
    { length: Math.ceil(totalItems / +perPage) },
    (_, i) => `${i + 1}`,
  );

  const lastPage = pages.length;
  const visiblePages = useMemo(
    () => pages.slice(
      getStartPage(currentPage, lastPage),
      getEndPage(currentPage, lastPage),
    ),
    [currentPage, lastPage],
  );

  const moveLeft = useCallback(() => {
    setSearchParams(
      normalizeUrlParams(searchParams, { page: `${currentPage - 1}` }),
    );

    window.scrollTo(0, 250);
  }, [currentPage, searchParams]);

  const moveRight = useCallback(() => {
    setSearchParams(
      normalizeUrlParams(searchParams, { page: `${currentPage + 1}` }),
    );

    window.scrollTo(0, 250);
  }, [searchParams, currentPage]);

  const setPage = useCallback(
    (page: string) => {
      setSearchParams(normalizeUrlParams(searchParams, { page }));
      window.scrollTo(0, 250);
    },
    [searchParams],
  );

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        <button
          className="pagination__button button-arrow"
          onClick={moveLeft}
          type="button"
          disabled={currentPage === 1}
          aria-label="pagination left arrow"
        >
          <ArrowLeft />
        </button>
      </li>

      {lastPage !== 3 && (
        <li className="pagination__item">
          <button
            className={cn('pagination__button', { active: currentPage === 1 })}
            onClick={() => setPage('1')}
            type="button"
            aria-label="pagination number 1"
          >
            1
          </button>
        </li>
      )}

      {currentPage > 2 && lastPage > 4 && (
        <p className="pagination__space">....</p>
      )}

      {lastPage > 1
        && visiblePages.map((page) => (
          <li className="pagination__item" key={page}>
            <button
              className={cn(
                'pagination__button', { active: currentPage === +page },
              )}
              onClick={() => setPage(page)}
              type="button"
              aria-label="pagination number 1"
            >
              {page}
            </button>
          </li>
        ))}

      {currentPage < lastPage - 2 && lastPage > 4 && (
        <p className="pagination__space">....</p>
      )}

      {currentPage < lastPage - 2 && (
        <li className="pagination__item">
          <button
            className={cn(
              'pagination__button', { active: currentPage === lastPage },
            )}
            onClick={() => setPage(`${lastPage}`)}
            type="button"
            aria-label="pagination number 1"
          >
            {lastPage}
          </button>
        </li>
      )}

      <li className="pagination__item">
        <button
          className="pagination__button button-arrow"
          onClick={moveRight}
          type="button"
          disabled={currentPage === lastPage}
          aria-label="pagination rigth arrow"
        >
          <ArrowRight />
        </button>
      </li>
    </ul>
  );
};
