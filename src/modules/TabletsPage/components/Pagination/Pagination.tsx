import React from 'react';

type Props = {
  totalItems: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  // if perPage is 'all' equivalent, perPage will equal totalItems
  const totalPages = perPage >= totalItems ? 1 : Math.ceil(totalItems / perPage);

  // hide pagination if not needed
  if (totalItems === 0 || totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          {'<'}
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          {'>'}
        </button>
      </div>

      <label>
        Items per page:
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={totalItems}>All</option>
        </select>
      </label>
    </div>
  );
};
