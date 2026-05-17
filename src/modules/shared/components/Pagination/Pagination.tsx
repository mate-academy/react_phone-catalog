import { useMemo } from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';

const BUTTON_SIZE = 32;
const BUTTON_GAP = 8;
const BREAKPOINT_TABLET = 640;
const BREAKPOINT_DESKTOP = 1200;
const PADDING_MOBILE = 32; // 16px × 2 sides
const PADDING_TABLET = 48; // 24px × 2 sides
const PADDING_DESKTOP = 64; // 32px × 2 sides
// Minimum width: 7 buttons (< 1 ... X ... N >) with delta=0
const MIN_PAGINATION_WIDTH = 7 * BUTTON_SIZE + 6 * BUTTON_GAP;
// Each delta level adds 2 buttons (left + right of current)
const WIDTH_PER_DELTA = 2 * (BUTTON_SIZE + BUTTON_GAP);

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(
  current: number,
  total: number,
  delta: number,
): PageItem[] {
  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  const result: PageItem[] = [1];

  if (rangeStart > 2) {
    result.push('ellipsis-left');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    result.push(i);
  }

  if (rangeEnd < total - 1) {
    result.push('ellipsis-right');
  }

  if (total > 1) {
    result.push(total);
  }

  return result;
}

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 3L11 8L6 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const delta = useMemo(() => {
    const horizontalPadding =
      window.innerWidth >= BREAKPOINT_DESKTOP
        ? PADDING_DESKTOP
        : window.innerWidth >= BREAKPOINT_TABLET
          ? PADDING_TABLET
          : PADDING_MOBILE;
    const available = window.innerWidth - horizontalPadding;

    return Math.min(
      totalPages,
      Math.max(
        0,
        Math.floor((available - MIN_PAGINATION_WIDTH) / WIDTH_PER_DELTA),
      ),
    );
  }, [totalPages]);

  const handlePageClick = (page: number) => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <nav aria-label="Pagination">
      <ul className={styles.root}>
        <li>
          <button
            className={cn(styles.button, styles.arrow, styles.arrowLeft)}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <span className={styles.icon}>
              <ChevronRight />
            </span>
          </button>
        </li>

        {getVisiblePages(currentPage, totalPages, delta).map(item =>
          item === 'ellipsis-left' || item === 'ellipsis-right' ? (
            <li key={item}>
              <span className={styles.ellipsis}>...</span>
            </li>
          ) : (
            <li key={item}>
              <button
                className={cn(styles.button, styles.page, {
                  [styles.active]: item === currentPage,
                })}
                onClick={() => handlePageClick(item)}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            className={cn(styles.button, styles.arrow)}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <span className={styles.icon}>
              <ChevronRight />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
