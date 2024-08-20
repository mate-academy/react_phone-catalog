import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import { useMediaQuery } from 'react-responsive';
import { SCREEN_SIZES } from '../../../styles/utils/icons/screenSizes';

export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState(4);
  const isMobile = useMediaQuery({ maxWidth: SCREEN_SIZES.mobileMax });
  const isTablet = useMediaQuery({ minWidth: SCREEN_SIZES.tabletMin - 1 });
  const isDesktop = useMediaQuery({ minWidth: SCREEN_SIZES.desktopMin });

  useEffect(() => {
    if (isDesktop) {
      setVisibleRange(16);
    } else if (isTablet) {
      setVisibleRange(8);
    } else if (isMobile) {
      setVisibleRange(4);
    }

    if (currentPage === 1) {
      if (isDesktop) {
        setVisibleRange(16);
        setStartIndex(0);
      } else if (isTablet) {
        setVisibleRange(8);
        setStartIndex(0);
      } else if (isMobile) {
        setVisibleRange(4);
        setStartIndex(0);
      }
    }
  }, [isMobile, isTablet, isDesktop, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) {
      return;
    }

    if (page !== currentPage) {
      onPageChange(page);

      if (page > startIndex + visibleRange) {
        setStartIndex(page - visibleRange + visibleRange - 1);
      } else if (page < startIndex + 1) {
        setStartIndex(page - visibleRange);
      } else if (page === startIndex && page < visibleRange) {
        setStartIndex(startIndex - 1);
      }
    }
  };

  return (
    <div className="pagination">
      <button
        className={cn(
          'pagination__item pagination__item--prev icon icon--arrow-pagination',
          {
            disabled: currentPage === 1,
          },
        )}
        onClick={() => handlePageChange(currentPage - 1)}
      ></button>
      <div className="pagination__items">
        {[...Array(pageCount).keys()]
          .slice(startIndex, startIndex + visibleRange)
          .map(page => (
            <button
              className={cn('pagination__item body-text', {
                'pagination__item--active': currentPage === page + 1,
              })}
              key={page}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
      </div>

      <button
        className={cn(
          'pagination__item pagination__item--next icon icon--arrow-pagination',
          {
            disabled: currentPage === pageCount,
          },
        )}
        onClick={() => handlePageChange(currentPage + 1)}
      ></button>
    </div>
  );
};
