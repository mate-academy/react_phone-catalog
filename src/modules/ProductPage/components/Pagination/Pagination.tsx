import React from 'react';
import { CircleButton } from '../../../../components/CircleButton';
import styles from './Pagination.module.scss';
import cn from 'classnames';
import { useTheme } from '../../../../hooks/useTheme';

type Props = {
  items: number;
  perPage: number;
  currentPage: number;
  onPageChange: (n: string) => void;
};

function getVisiblePages(nums: number[], curPage: number) {
  const numLength = nums.length;

  if (numLength < 6) {
    return [...nums];
  }

  if (numLength >= 6) {
    if (curPage < 3) {
      return [...nums.slice(0, 3), '...', nums.at(-1)];
    }

    if (curPage === 3) {
      return [...nums.slice(0, 4), '...', nums.at(-1)];
    }

    if (curPage > numLength - 3) {
      return [nums[0], '...', ...nums.slice(numLength - 4)];
    }
  }

  return [
    nums[0],
    '...',
    ...nums.slice(curPage - 2, curPage + 1),
    '...',
    nums.at(-1),
  ];
}

export const Pagination: React.FC<Props> = ({
  items,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const isDark = useTheme();
  const firstPage = 1;
  const allPages = Math.ceil(items / perPage);

  if (allPages <= 1) {
    return;
  }

  const pages = Array.from({ length: allPages }, (_, index) => index + 1);

  const visiblePages = getVisiblePages(pages, currentPage);

  return (
    allPages > 1 && (
      <div
        className={`${styles.pagination} ${isDark ? styles['pagination--dark'] : styles['pagination--light']}`}
      >
        <div
          className={`${styles.pagination__btn} ${styles['pagination__btn--prev']}`}
          onClick={() => {
            onPageChange(`${currentPage - 1}`);
          }}
        >
          <CircleButton
            type="arrow-left"
            isDisabled={firstPage === currentPage}
          />
        </div>
        <div className={styles.pagination__tabs}>
          {visiblePages.map((val, index) => {
            const isPage = typeof val === 'number';

            return isPage ? (
              <button
                className={cn(styles.pagination__tab, {
                  [styles['pagination__tab--active']]: currentPage === val,
                })}
                key={val}
                onClick={() => {
                  onPageChange(`${val}`);
                }}
              >
                {val}
              </button>
            ) : (
              <p className={styles.pagination__dot} key={`dot-${index}`}>
                {val}
              </p>
            );
          })}
        </div>
        <div
          className={`${styles.pagination__btn} ${styles['pagination__btn--next']}`}
          onClick={() => {
            onPageChange(`${currentPage + 1}`);
          }}
        >
          <CircleButton
            type="arrow-right"
            isDisabled={allPages === currentPage}
          />
        </div>
      </div>
    )
  );
};
