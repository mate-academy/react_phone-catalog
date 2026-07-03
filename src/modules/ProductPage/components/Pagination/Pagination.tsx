import { useEffect, useState } from 'react';
import cn from 'classnames';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../shared/ui/Icons/Icons';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const MOBILE_MAX_VISIBLE = 3;
const TABLET_MAX_VISIBLE = 5;
const DESKTOP_MAX_VISIBLE = 7;

const getMaxVisibleByWidth = (width: number) => {
  if (width >= 1200) {
    return DESKTOP_MAX_VISIBLE;
  }

  if (width >= 640) {
    return TABLET_MAX_VISIBLE;
  }

  return MOBILE_MAX_VISIBLE;
};

const getVisiblePages = (
  pageCount: number,
  currentPage: number,
  maxVisible: number,
) => {
  if (pageCount <= maxVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const innerCount = Math.max(1, maxVisible - 2);
  const headWindow = Math.max(2, maxVisible - 1);
  const tailStart = pageCount - (maxVisible - 2);

  if (currentPage <= headWindow) {
    const leftRange = Array.from({ length: maxVisible - 1 }, (_, i) => i + 1);

    return [...leftRange, 'dots-right', pageCount];
  }

  if (currentPage >= tailStart) {
    const rightRange = Array.from(
      { length: maxVisible - 1 },
      (_, i) => pageCount - (maxVisible - 1) + 1 + i,
    );

    return [1, 'dots-left', ...rightRange];
  }

  const middleStart = Math.max(2, currentPage - Math.floor(innerCount / 2));
  const middleEnd = Math.min(pageCount - 1, middleStart + innerCount - 1);
  const adjustedMiddleStart = Math.max(2, middleEnd - innerCount + 1);
  const middlePages = Array.from(
    { length: innerCount },
    (_, i) => adjustedMiddleStart + i,
  );

  return [1, 'dots-left', ...middlePages, 'dots-right', pageCount];
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / perPage);
  const [maxVisible, setMaxVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return DESKTOP_MAX_VISIBLE;
    }

    return getMaxVisibleByWidth(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(getMaxVisibleByWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = getVisiblePages(pageCount, currentPage, maxVisible);

  return (
    <ul className={styles.pagination} data-cy="pagination">
      <li>
        <a
          data-cy="prevLink"
          href="#prev"
          className={cn(styles.link, styles.linkArrow, {
            [styles.linkDisabled]: currentPage === 1,
          })}
          aria-disabled={currentPage === 1}
          onClick={event => {
            event.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <ChevronLeftIcon />
        </a>
      </li>

      {pages.map((page, index) => {
        if (typeof page !== 'number') {
          return (
            <li key={`${page}-${index}`}>
              <span className={cn(styles.link, styles.linkDots)}>...</span>
            </li>
          );
        }

        return (
          <li key={page}>
            <a
              data-cy="pageLink"
              href={`#${page}`}
              className={cn(styles.link, {
                [styles.linkActive]: page === currentPage,
              })}
              onClick={event => {
                event.preventDefault();
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li>
        <a
          data-cy="nextLink"
          href="#next"
          className={cn(styles.link, styles.linkArrow, {
            [styles.linkDisabled]: currentPage === pageCount,
          })}
          aria-disabled={currentPage === pageCount}
          onClick={event => {
            event.preventDefault();
            if (currentPage < pageCount) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <ChevronRightIcon />
        </a>
      </li>
    </ul>
  );
};
