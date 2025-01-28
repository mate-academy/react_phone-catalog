import { useMemo } from 'react';
import cn from 'classnames';

import { Product } from '../../../types/ProductsType';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (el: URLSearchParams) => void;
  currentPage: number;
  paginatedProducts: Product[][];
};

export const Pagination: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  currentPage,
  paginatedProducts,
}) => {
  const scrollToTop = () => window.scrollTo(0, 0);

  const handlePageChange = (index: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', `${index}`);

    setSearchParams(params);
    scrollToTop();
  };

  const visiblePages = useMemo(() => {
    const normalizeCurrentPage = Math.max(
      0,
      Math.min(+currentPage, paginatedProducts.length - 1),
    );
    const totalPages = paginatedProducts.length;

    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (normalizeCurrentPage <= 3) {
      return [0, 1, 2, 3];
    }

    if (normalizeCurrentPage === totalPages - 1) {
      return Array.from({ length: 4 }, (_, i) => totalPages - 4 + i);
    }

    if (normalizeCurrentPage > 3 && normalizeCurrentPage < totalPages - 1) {
      return [
        normalizeCurrentPage - 3,
        normalizeCurrentPage - 2,
        normalizeCurrentPage - 1,
        normalizeCurrentPage,
      ];
    }

    return [
      normalizeCurrentPage - 1,
      normalizeCurrentPage,
      normalizeCurrentPage + 1,
      normalizeCurrentPage + 2,
    ];
  }, [paginatedProducts, currentPage]);

  const handleButtonPaginationNext = () => {
    const newCurrentPage = Math.min(
      +currentPage + 1,
      paginatedProducts.length - 1,
    );

    const params = new URLSearchParams(searchParams);

    params.set('currentPage', `${newCurrentPage}`);
    setSearchParams(params);
    scrollToTop();
  };

  const handleButtonPaginationBack = () => {
    const newCurrentPage = Math.max(+currentPage - 1, 0);

    const params = new URLSearchParams(searchParams);

    params.set('currentPage', `${newCurrentPage}`);
    setSearchParams(params);
    scrollToTop();
  };

  return (
    paginatedProducts.length > 1 && (
      <div className="pagination">
        <div className="pagination__container">
          <button
            className="
          pagination__button-basic--back pagination__button-basic
        "
            onClick={() => {
              handleButtonPaginationBack();
            }}
          >
            <div className="icon icon--array--left--light"></div>
          </button>
          <div className="pagination__buttons-container">
            {paginatedProducts.length >= 4 ? (
              visiblePages.map(page => (
                <button
                  key={page}
                  className={cn(
                    'pagination__button-basic pagination__button-list',
                    {
                      'pagination__button-list--active': page === currentPage,
                    },
                  )}
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </button>
              ))
            ) : (
              <div></div>
            )}
          </div>
          <button
            className="
          pagination__button-basic--next pagination__button-basic
        "
            onClick={() => {
              handleButtonPaginationNext();
            }}
          >
            <div className="icon icon--array--right--light"></div>
          </button>
        </div>
      </div>
    )
  );
};
