import cn from 'clsx';
import { NextButton, PrevButton } from './ArrowButtons';
import { PageButton } from './PageButton';
import type { FC } from 'react';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pages: number[];
  totalPages: number;
  className?: string;
};

export const Pagination: FC<Props> = ({
  currentPage,
  setCurrentPage,
  pages,
  totalPages,
  className,
}) => {
  return (
    <div
      className={cn('mt-10 flex items-center justify-center gap-4', className)}
    >
      <PrevButton
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />

      <ol className="flex items-center justify-center gap-2">
        {pages.map(page => (
          <li key={page}>
            <PageButton
              disabled={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          </li>
        ))}
      </ol>

      <NextButton
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};
