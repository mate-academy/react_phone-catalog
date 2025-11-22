import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, total);

  // 🔧 lógica de blocos
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 7) {
    const currentBlock = Math.floor((currentPage - 1) / 7);

    startPage = currentBlock * 7 + 1;
    endPage = Math.min(startPage + 6, totalPages);
  }

  const pagesInBlock = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const goPrevBlock = () => {
    const prevStart = Math.max(1, startPage - 7);

    handlePageClick(prevStart);
  };

  const goNextBlock = () => {
    const nextStart = startPage + 7;

    if (nextStart <= totalPages) {
      handlePageClick(nextStart);
    }
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {/* Bloco esquerdo: Items per page */}
      <div className={styles.selector}>
        <label htmlFor="perPageSelector">Items per page:</label>
        <select
          id="perPageSelector"
          data-cy="perPageSelector"
          value={perPage}
          onChange={e => {
            const newPerPage = Number(e.target.value);

            onPerPageChange(newPerPage);
            onPageChange(1);
          }}
        >
          {[3, 5, 10, 20].map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Bloco direito: Info + páginas */}
      <div className={styles.rightBlock}>
        <div data-cy="info" className={styles.info}>
          Page {currentPage} (items {startItem} - {endItem} of {total})
        </div>

        <ul className={styles.list}>
          {/* Chevron esquerda */}
          <li
            className={`${styles.item} ${startPage === 1 ? styles.disabled : ''}`}
            aria-disabled={startPage === 1}
            onClick={startPage === 1 ? undefined : goPrevBlock}
          >
            «
          </li>

          {/* Reticências à esquerda */}
          {startPage > 1 && (
            <li className={styles.item} onClick={goPrevBlock}>
              ...
            </li>
          )}

          {/* Páginas do bloco atual */}
          {pagesInBlock.map(page => (
            <li
              key={page}
              className={`${styles.item} ${page === currentPage ? styles.active : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </li>
          ))}

          {/* Reticências à direita */}
          {endPage < totalPages && (
            <li className={styles.item} onClick={goNextBlock}>
              ...
            </li>
          )}

          {/* Chevron direita */}
          <li
            className={`${styles.item} ${endPage === totalPages ? styles.disabled : ''}`}
            aria-disabled={endPage === totalPages}
            onClick={endPage === totalPages ? undefined : goNextBlock}
          >
            »
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
