import React from 'react';
import './PaginationControls.scss';
import classNames from 'classnames';
import { useTheme } from '../../../components/context/ThemeContext';

type Props = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export const PaginationControls: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
}) => {
  const { theme } = useTheme();
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  let pages: (number | 'DOTS')[] = [];

  if (totalPages <= 5 + siblingCount * 2) {
    pages = range(1, totalPages);
  } else {
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      pages = [...range(1, 3 + siblingCount * 2), 'DOTS', totalPages];
    } else if (showLeftDots && !showRightDots) {
      pages = [
        1,
        'DOTS',
        ...range(totalPages - (2 + siblingCount * 2), totalPages),
      ];
    } else if (showLeftDots && showRightDots) {
      pages = [
        1,
        'DOTS',
        ...range(leftSibling, rightSibling),
        'DOTS',
        totalPages,
      ];
    }
  }

  return (
    <div className="pagination">
      <button
        className={classNames('pagination__step', {
          'pagination__step--disabled': currentPage === 1,
        })}
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          src={
            theme === 'light'
              ? './img/icons/Arrow-Left_icon.svg'
              : './img/icons/Arrow-Left_dark.svg'
          }
          alt="arrow left"
          className="icon"
        />
      </button>

      {pages.map((page, index) =>
        page === 'DOTS' ? (
          <span key={index} className="pagination__dots">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => {
              onPageChange(page as number);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={classNames('pagination__page', {
              'pagination__page--active': page === currentPage,
            })}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={classNames('pagination__step', {
          'pagination__step--disabled': currentPage === totalPages,
        })}
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          src={
            theme === 'light'
              ? './img/icons/Arrow-Right_icon.svg'
              : './img/icons/Arrow-Right_dark.svg'
          }
          alt="arrow right"
          className="icon"
        />
      </button>
    </div>
  );
};
