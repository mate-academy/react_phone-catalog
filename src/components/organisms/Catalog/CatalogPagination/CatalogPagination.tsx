import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { ArrowButton } from '@/components/molecules';

import styles from './CatalogPagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const CatalogPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visiblePageCount, setVisiblePageCount] = useState(1);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateVisiblePageCount = () => {
      const firstButton = container.querySelector('button');

      if (!firstButton) {
        return;
      }

      const buttonWidth = firstButton.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
      const availableWidth = container.clientWidth;
      const pageCount = Math.floor(
        (availableWidth - 2 * buttonWidth - gap) / (buttonWidth + gap),
      );

      setVisiblePageCount(Math.max(1, Math.min(totalPages, pageCount)));
    };

    updateVisiblePageCount();

    const resizeObserver = new ResizeObserver(updateVisiblePageCount);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const firstVisiblePage = Math.min(
    Math.max(1, currentPage - visiblePageCount + 1),
    Math.max(1, totalPages - visiblePageCount + 1),
  );
  const lastVisiblePage = Math.min(
    totalPages,
    firstVisiblePage + visiblePageCount - 1,
  );

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, className)}
    >
      <ArrowButton
        direction="left"
        className={styles.page}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      />

      {Array.from(
        { length: lastVisiblePage - firstVisiblePage + 1 },
        (_, index) => firstVisiblePage + index,
      ).map((page) => (
        <button
          key={page}
          className={`${styles.page} ${
            currentPage === page ? styles.active : ''
          }`}
          onClick={() => handlePageChange(page)}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <ArrowButton
        direction="right"
        className={styles.page}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      />
    </div>
  );
};
