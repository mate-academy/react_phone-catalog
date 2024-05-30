import React from 'react';
import { getNumbers } from '../../../services/getNumbers';
import { getActivePage } from '../../../services/getActivePage';
import { MoveButton, NumberOrSymbol } from '../../shared/Buttons/MoveButtons';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = React.memo(
  ({ total, perPage, currentPage, onPageChange }) => {
    const countPages = Math.ceil(total / perPage);

    const firstItem = 1;
    const lastItem = Math.min(5, countPages);

    const prevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const nextPage = () => {
      if (currentPage < countPages) {
        onPageChange(currentPage + 1);
      }
    };

    const getFirstItem = () => {
      if (currentPage > 3 && countPages > 5) {
        return Math.min(currentPage - 2, countPages - 4);
      }

      return firstItem;
    };

    const getLastItem = () => {
      return Math.min(getFirstItem() + 4, countPages);
    };

    const pages = getNumbers(
      getFirstItem() || firstItem,
      getLastItem() || lastItem,
    );

    const pageChange = (page: number) => {
      onPageChange(page);
    };

    return (
      <div className="pagination">
        <MoveButton move={prevPage} disabled={currentPage === 1} />

        <div className="pagination__pages">
          {pages.map((page, i) => (
            <NumberOrSymbol
              key={page}
              move={() => pageChange(page)}
              active={i === getActivePage(currentPage, countPages)}
              number={page}
            />
          ))}
        </div>

        <MoveButton move={nextPage} disabled={currentPage === countPages} />
      </div>
    );
  },
);
