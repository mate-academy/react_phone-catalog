/* eslint-disable max-len */
import classNames from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  parentClassName?: string;
  productsLength: number;
};

export const Pagination: React.FC<Props> = ({
  parentClassName = '',
  productsLength,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);
  const totalPages = useMemo(
    () =>
      Math.ceil(
        productsLength / Number(searchParams.get('perPage') ?? productsLength),
      ),
    [productsLength, searchParams],
  );

  type PageNums = {
    first: number | null;
    second: number | null;
    third: number | null;
    fourth: number | null;
  };

  const pagesNums: PageNums = useMemo(
    () => ({
      first: currentPage - 1,
      second: currentPage,
      third: currentPage + 1,
      fourth: currentPage + 2,
    }),
    [currentPage],
  );

  const formattedPages = useMemo(() => {
    if (currentPage <= 1) {
      return {
        first: 1,
        second: 2 > totalPages ? null : 2,
        third: 3 > totalPages ? null : 3,
        fourth: 4 > totalPages ? null : 4,
      };
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
      return {
        first: totalPages - 3 < 1 ? null : totalPages - 3,
        second: totalPages - 2,
        third: totalPages - 1,
        fourth: totalPages,
      };
    } else {
      return pagesNums;
    }
  }, [pagesNums, totalPages, currentPage]);

  const pages = useMemo(
    () => [
      { id: 1, value: formattedPages.first },
      { id: 2, value: formattedPages.second },
      { id: 3, value: formattedPages.third },
      { id: 4, value: formattedPages.fourth },
    ],
    [formattedPages],
  );

  const handleNextPage = () => {
    searchParams.set('page', `${currentPage + 1}`);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set('page', `${currentPage - 1}`);
    setSearchParams(searchParams);
  };

  const handleToPage = (page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  return (
    <section
      className={classNames('pagination', {
        [`${parentClassName}__pagination`]: parentClassName,
      })}
    >
      <button
        disabled={currentPage <= 1}
        onClick={handlePrevPage}
        className="pagination__slider slide-button"
      ></button>
      <div className="pagination__pages">
        {pages.map(
          page =>
            page.value !== null &&
            page.value > 0 && (
              <p
                key={page.id}
                onClick={() => page.value && handleToPage(page.value)}
                className={classNames('pagination__page-link body-text', {
                  'pagination__page-link--active': currentPage === page.value,
                })}
              >
                {page.value}
              </p>
            ),
        )}
      </div>
      <button
        disabled={currentPage >= totalPages}
        onClick={handleNextPage}
        className="pagination__slider slide-button"
      ></button>
    </section>
  );
};
