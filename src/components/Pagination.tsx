/* eslint-disable react/display-name */
import { ArrowButton } from './ArrowButton';
import { twMerge } from 'tailwind-merge';
import { PaginationItem } from './PaginationItem';
import { getPaginationItems } from '../helpers/functions';
import { useMemo } from 'react';
import React from 'react';

interface Props {
  maxLength: number;
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<Props> = React.memo(
  ({ maxLength, currentPage, lastPage, className = '', setCurrentPage }) => {
    const pageNums = useMemo(() => {
      return getPaginationItems(currentPage, lastPage, maxLength);
    }, [currentPage, lastPage, maxLength]);

    return (
      <div className={twMerge('flex flex-wrap gap-4', className)}>
        <ArrowButton
          position="left"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />

        <div className="flex gap-2">
          {pageNums.map(({ pageNum, id }) => (
            <PaginationItem
              key={id}
              active={currentPage === pageNum}
              disabled={Number.isNaN(pageNum)}
              onClick={() => setCurrentPage(pageNum)}
            >
              {!Number.isNaN(pageNum) ? pageNum : '...'}
            </PaginationItem>
          ))}
        </div>

        <ArrowButton
          position="right"
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    );
  },
);
