/* eslint-disable max-len */
import React from 'react';
import { getNumbersToPagination } from '../../../services/getNumbersToPagination';
import { getActivePagePagination } from '../../../services/getActivePagePagination';
import {
  MoveButton,
  NumberOrSymbol as Number,
} from '../../shared/Buttons/MoveButtons';

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

    const pages = getNumbersToPagination(
      getFirstItem() || firstItem,
      getLastItem() || lastItem,
    );

    const handleChangePage = (page: number) => {
      onPageChange(page);
    };

    return (
      <div className="pagination">
        <MoveButton move={prevPage} disabled={currentPage === 1} />

        <div className="pagination__pages">
          {pages.map((page, i) => (
            <Number
              key={page}
              move={() => handleChangePage(page)}
              active={i === getActivePagePagination(currentPage, countPages)}
              number={page}
            />
          ))}
        </div>

        <MoveButton move={nextPage} disabled={currentPage === countPages} />
      </div>
    );
  },
);
