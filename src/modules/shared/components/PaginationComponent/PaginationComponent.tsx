import React from 'react';
import styles from './PaginationComponent.module.scss';

type PaginationComponentProps = {
  totalCount: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type PaginationItem = {
  type: 'page' | 'dots';
  value: number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / perPage);

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }

    onPageChange(newPage);
  };

  const handlePrev = () => updatePage(currentPage - 1);
  const handleNext = () => updatePage(currentPage + 1);

  const getPaginationGroup = (): PaginationItem[] => {
    const siblingCount = 1;

    const range = (start: number, end: number): PaginationItem[] => {
      return Array.from({ length: end - start + 1 }, (_, idx) => ({
        type: 'page',
        value: idx + start,
      }));
    };

    if (totalPages <= 7) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const leftDotsItem: PaginationItem = {
      type: 'dots',
      value: leftSiblingIndex - 1,
    };

    const rightDotsItem: PaginationItem = {
      type: 'dots',
      value: rightSiblingIndex + 1,
    };

    const firstPageItem: PaginationItem = { type: 'page', value: 1 };
    const lastPageItem: PaginationItem = { type: 'page', value: totalPages };

    // Початок (без лівих крапок)
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      const specificRightDots: PaginationItem = {
        type: 'dots',
        value: leftItemCount + 1,
      };
      return [...leftRange, specificRightDots, lastPageItem];
    }

    // Кінець (без правих крапок)
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      const specificLeftDots: PaginationItem = {
        type: 'dots',
        value: totalPages - rightItemCount,
      };
      return [firstPageItem, specificLeftDots, ...rightRange];
    }

    // Посередині (і ліві, і праві крапки)
    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageItem,
        leftDotsItem,
        ...middleRange,
        rightDotsItem,
        lastPageItem,
      ];
    }

    return range(1, totalPages);
  };

  const paginationItems = getPaginationGroup();

  if (totalPages <= 1) {
    return null; // пагінація не має сенсу — просто не рендеримо
  }

  return (
    <div className={styles.paginationComponent}>
      <button
        className={styles.paginationComponent__button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4717 3.52851C10.2114 3.26816 9.78927 3.26816 9.52892 3.52851L5.52892 7.52851C5.26857 7.78886 5.26857 8.21097 5.52892 8.47132L9.52892 12.4713C9.78927 12.7317 10.2114 12.7317 10.4717 12.4713C10.7321 12.211 10.7321 11.7889 10.4717 11.5285L6.94313 7.99992L10.4717 4.47132C10.7321 4.21097 10.7321 3.78886 10.4717 3.52851Z"
            fill="#313237"
          />
        </svg>
      </button>

      <div className={styles.paginationComponent__pages}>
        {paginationItems.map((item, index) => {
          if (item.type === 'dots') {
            return (
              <button
                key={`dots-${index}`}
                className={styles.paginationComponent__dots}
                onClick={() => updatePage(item.value)}
                title={`Go to page ${item.value}`}
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={item.value}
              className={
                item.value === currentPage
                  ? styles.paginationComponent__page_active
                  : styles.paginationComponent__page
              }
              onClick={() => updatePage(item.value)}
            >
              {item.value}
            </button>
          );
        })}
      </div>

      <button
        className={styles.paginationComponent__button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
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
