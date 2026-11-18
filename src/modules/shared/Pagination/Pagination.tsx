import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  className,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPages = (
    current: number,
    totalLength: number,
  ): (number | '...')[] => {
    if (total <= 7) {
      return Array.from({ length: totalLength }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(totalLength - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < totalLength - 2) {
      pages.push('...');
    }

    pages.push(totalLength);

    return pages;
  };

  return (
    <div className={`${styles.pagination} ${className || ''}`}>
      <button
        className={`${styles.pagination__btn} ${styles.pagination__btn_left} ${currentPage === 1 ? styles.pagination__btn_disabled : ''}`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      ></button>

      <div className={styles.pagination__pages}>
        {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`${styles.pagination__page} ${page === currentPage ? styles.pagination__page_active : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))} */}
        {getPages(currentPage, totalPages).map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className={styles.pagination__dots}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pagination__page} ${page === currentPage ? styles.pagination__page_active : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={`${styles.pagination__btn} ${styles.pagination__btn_right} ${currentPage === totalPages ? styles.pagination__btn_disabled : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      ></button>
    </div>
  );
};
