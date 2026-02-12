import styles from './style.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }

        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_block}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={styles.pagination_arrow}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/Arrow_Left.svg`}
            alt="Previous"
          />
        </button>

        <div className={styles.pagination_block_numbers}>
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={
                  currentPage === pageNum ? styles.selected : styles.buttons
                }
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={styles.pagination_arrow}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/Arrow_Right.svg`}
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
