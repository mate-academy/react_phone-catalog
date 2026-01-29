import cn from 'classnames';
import React from 'react';

interface NumeratedButtonProps {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
// #endregion

// #region Local components
export const NumeratedButton: React.FC<NumeratedButtonProps> = ({
  page,
  currentPage,
  onPageChange,
}) => {
  const isActive = page === currentPage;
  const text = page + 1;

  return (
    <button
      className={cn('button', {
        'button--selected': isActive,
      })}
      onClick={() => onPageChange(page)}
    >
      {text}
    </button>
  );
};
