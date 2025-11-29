import React from 'react';
import styles from './PaginationComponent.module.scss';
import { useSearchParams } from 'react-router-dom';

type PaginationComponentProps = {
  totalCount: number;
  perPage: number;
  currentPage: number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalCount / perPage);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const handlePrev = () => {
    updatePage(currentPage - 1);
  };

  const handleNext = () => {
    updatePage(currentPage + 1);
  };

  return (
    <div className={styles.paginationComponent}>
      {/* Prev button */}
      <button
        className={styles.paginationComponent__button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {/* ← */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4717 3.52851C10.2114 3.26816 9.78927 3.26816 9.52892 3.52851L5.52892 7.52851C5.26857 7.78886 5.26857 8.21097 5.52892 8.47132L9.52892 12.4713C9.78927 12.7317 10.2114 12.7317 10.4717 12.4713C10.7321 12.211 10.7321 11.7889 10.4717 11.5285L6.94313 7.99992L10.4717 4.47132C10.7321 4.21097 10.7321 3.78886 10.4717 3.52851Z"
            fill="#313237"
          />
        </svg>
      </button>

      {/* Page numbers */}
      <div className={styles.paginationComponent__pages}>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;

          return (
            <button
              key={pageNum}
              className={
                pageNum === currentPage
                  ? styles.paginationComponent__page_active
                  : styles.paginationComponent__page
              }
              onClick={() => updatePage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        className={styles.paginationComponent__button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {/* → */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.52827 3.52851C5.78862 3.26816 6.21073 3.26816 6.47108 3.52851L10.4711 7.52851C10.7314 7.78886 10.7314 8.21097 10.4711 8.47132L6.47108 12.4713C6.21073 12.7317 5.78862 12.7317 5.52827 12.4713C5.26792 12.211 5.26792 11.7889 5.52827 11.5285L9.05687 7.99992L5.52827 4.47132C5.26792 4.21097 5.26792 3.78886 5.52827 3.52851Z"
            fill="#313237"
          />
        </svg>
      </button>
    </div>
  );
};

export default PaginationComponent;
