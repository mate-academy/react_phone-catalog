import { useMemo } from 'react';

import { Button } from '@/shared/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const generateRange = (
  currentPage: number,
  totalPages: number,
  maxVisibleButtons: number,
) => {
  const siblings = Math.floor((maxVisibleButtons - 1) / 2);

  let start = currentPage - siblings;
  let end = currentPage + siblings;

  if (start < 1) {
    start = 1;
    end = Math.min(totalPages, maxVisibleButtons);
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - maxVisibleButtons + 1);
  }

  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const mobilePages = useMemo(
    () => generateRange(currentPage, totalPages, 3),
    [currentPage, totalPages],
  );
  const desktopPages = useMemo(
    () => generateRange(currentPage, totalPages, 7),
    [currentPage, totalPages],
  );

  const renderPageButton = (page: number) => {
    const isCurrent = currentPage === page;
    return (
      <Button
        variant="pagination"
        aria-current={isCurrent ? 'page' : undefined}
        key={page}
        onClick={() => onPageChange(page)}
        className="w-10 h-10 transition-colors"
      >
        {page}
      </Button>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 select-none">
      <Button
        variant="control"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 transition-colors mr-2 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-2 min-[600px]:hidden">
        {mobilePages.map((page) => renderPageButton(page))}
      </div>

      <div className="hidden min-[600px]:flex items-center gap-2">
        {desktopPages.map((page) => renderPageButton(page))}
      </div>

      <Button
        variant="control"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 transition-colors ml-2 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
