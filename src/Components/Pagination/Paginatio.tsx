import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/getNumber';
import { Product } from '../../types/Product';

import './Pagination.scss';

type Props = {
  visibleProducts: Product[];
  setCurrentPage: (newPage: number) => void;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  visibleProducts,
  setCurrentPage,
  currentPage,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prevQuery, setPrevQuery] = useState<string | null>(
    searchParams.get('query'),
  );
  const [prevPerPage, setPrevPerPage] = useState<string | null>(
    searchParams.get('perPage'),
  );

  const total = visibleProducts.length;

  const pageCount = Math.ceil(total / perPage);
  const pageButtons = getNumbers(1, pageCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  useEffect(() => {
    const query = searchParams.get('query');
    const perPageSearch = searchParams.get('perPage');

    if (query !== prevQuery || perPageSearch !== prevPerPage) {
      setCurrentPage(1);
      setPrevQuery(query);
      setPrevPerPage(perPageSearch);
    }
  }, [searchParams, setCurrentPage, prevQuery, prevPerPage]);

  const prevButton = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextButton = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const selectPage = (newPage: number) => {
    setCurrentPage(newPage);

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      {pageButtons.length > 1 && (
        <div className="pagination">
          <button
            type="button"
            className={classNames(
              'pagination__button-left',
              'pagination__button',
              { isFirstPage },
            )}
            onClick={prevButton}
            aria-label="Prev page"
          />

          {pageCount > 6 && (
            <>
              {currentPage > 2 && (
                <button
                  type="button"
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                  )}
                  aria-label={`Page`}
                  onClick={() => selectPage(1)}
                >
                  {1}
                </button>
              )}

              {currentPage > 3 && <p className="pagination__skip">...</p>}

              {currentPage > 1 && (
                <button
                  type="button"
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                  )}
                  aria-label={`Page`}
                  onClick={() => selectPage(currentPage - 1)}
                >
                  {currentPage - 1}
                </button>
              )}

              <button
                type="button"
                className={classNames(
                  'pagination__button-item',
                  'pagination__button',
                  { activePage: currentPage },
                )}
                aria-label={`Page`}
                onClick={() => selectPage(currentPage)}
              >
                {currentPage}
              </button>

              {currentPage < pageCount - 2 && (
                <button
                  type="button"
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                  )}
                  aria-label={`Page`}
                  onClick={() => selectPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </button>
              )}

              {pageCount - 3 < currentPage && pageCount - 1 > currentPage && (
                <button
                  type="button"
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                  )}
                  aria-label={`Page`}
                  onClick={() => selectPage(pageCount - 1)}
                >
                  {pageCount - 1}
                </button>
              )}

              {currentPage < pageCount - 2 && (
                <p className="pagination__skip">...</p>
              )}

              {currentPage !== pageCount && (
                <button
                  type="button"
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                  )}
                  aria-label={`Page`}
                  onClick={() => selectPage(pageCount)}
                >
                  {pageCount}
                </button>
              )}
            </>
          )}

          {pageCount < 7 && (
            <>
              {pageButtons.map(page => (
                <button
                  type="button"
                  key={page}
                  className={classNames(
                    'pagination__button-item',
                    'pagination__button',
                    { activePage: page === currentPage },
                  )}
                  aria-label={`Page #${page}`}
                  onClick={() => selectPage(page)}
                >
                  {page}
                </button>
              ))}
            </>
          )}

          <button
            type="button"
            className={classNames(
              'pagination__button-right',
              'pagination__button',
              { isLastPage },
            )}
            aria-label="Next page"
            onClick={nextButton}
          />
        </div>
      )}
    </>
  );
};
