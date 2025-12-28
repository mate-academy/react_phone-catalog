import React, { useMemo } from 'react';
import classNames from 'classnames/bind'; // Optional, but recommended
import styles from './PaginationComponent.module.scss';
import { ArrowIcon } from '@/components/Icons/ArrowIcon';
import { useTheme } from '@/context/ThemeContext';

// Helper for cleaner classes if you don't use a library
const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

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

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useTheme();
  const totalPages = Math.ceil(totalCount / perPage);

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    onPageChange(newPage);
  };

  // Memoize logic so it doesn't recalculate on unrelated renders
  const paginationItems = useMemo(() => {
    const siblingCount = 1;
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, idx) => ({
        type: 'page' as const,
        value: idx + start,
      }));

    if (totalPages <= 7) return range(1, totalPages);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPage = { type: 'page' as const, value: 1 };
    const lastPage = { type: 'page' as const, value: totalPages };
    const leftDots = { type: 'dots' as const, value: leftSiblingIndex - 1 };
    const rightDots = { type: 'dots' as const, value: rightSiblingIndex + 1 };

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [
        ...range(1, leftItemCount),
        { ...rightDots, value: leftItemCount + 1 },
        lastPage,
      ];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [
        firstPage,
        { ...leftDots, value: totalPages - rightItemCount },
        ...range(totalPages - rightItemCount + 1, totalPages),
      ];
    }

    return [
      firstPage,
      leftDots,
      ...range(leftSiblingIndex, rightSiblingIndex),
      rightDots,
      lastPage,
    ];
  }, [totalCount, perPage, currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination} data-theme={theme}>
      <button
        className={styles.pagination__navBtn}
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className={styles.pagination__list}>
        {paginationItems.map((item, index) => {
          if (item.type === 'dots') {
            return (
              <button
                key={`dots-${index}`}
                className={styles.pagination__dots}
                onClick={() => updatePage(item.value)}
                title={`Go to page ${item.value}`}
              >
                &#8230;
              </button>
            );
          }

          const isActive = item.value === currentPage;

          return (
            <button
              key={item.value}
              className={cx(
                styles.pagination__page,
                isActive ? styles.active : '',
              )}
              onClick={() => updatePage(item.value)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.value}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination__navBtn}
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
};
