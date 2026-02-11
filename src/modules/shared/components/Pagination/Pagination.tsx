import React from 'react';
import { NavButton } from './NavButton';
import { NumeratedButton } from './NumeratedButton';

interface PaginationProps {
  visiblePages: number[];
  currentPage: number;
  isMoveLeftDisabled: boolean;
  isMoveRightDisabled: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  visiblePages,
  currentPage,
  isMoveLeftDisabled,
  isMoveRightDisabled,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <NavButton
        direction="left"
        toPage={currentPage - 1}
        disabled={isMoveLeftDisabled}
        onPageChange={onPageChange}
      />

      {visiblePages.map(page => {
        return (
          <NumeratedButton
            key={page}
            page={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        );
      })}

      <NavButton
        direction="right"
        toPage={currentPage + 1}
        disabled={isMoveRightDisabled}
        onPageChange={onPageChange}
      />
    </div>
  );
};
