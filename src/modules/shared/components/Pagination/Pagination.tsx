import React from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const { t } = useTranslation();
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn(styles.pagination, className)}>
      <Button
        variant="icon"
        iconLeft="arrow-left"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={t('common.previousPage')}
      />

      <div className={styles.pagination__pages}>
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={styles.pagination__ellipsis}
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant="icon"
              selected={page === currentPage}
              onClick={() => onPageChange(page as number)}
              aria-label={t('common.page', { number: page })}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="icon"
        iconRight="arrow-right"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={t('common.nextPage')}
      />
    </div>
  );
};
