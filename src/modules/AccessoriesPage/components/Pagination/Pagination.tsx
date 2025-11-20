import React from 'react';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = perPage >= total ? 1 : Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="controls">
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
        <select value={perPage} onChange={(e) => onPerPageChange(Number(e.target.value))}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={total}>All</option>
        </select>
      </label>
    </div>
  );
};
