import { FC } from 'react';
import Left from 'assets/icons/arrow-left.svg';
import Right from 'assets/icons/arrow-right.svg';
import styles from './Pagination.module.scss';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const getVisiblePages = (
    current: number,
    total: number,
  ): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (current > 2) {
      pages.push(1);
      if (current > 3) pages.push('...');
    }

    for (
      let i = Math.max(1, current - 2);
      i <= Math.min(total, current + 2);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - 2) {
      if (current < total - 3) pages.push('...');
      pages.push(total);
    }

    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation">
      <div className={styles.container}>
        <ul className={styles.pagination} role="navigation">
          <li
            className={`${styles.page_item} ${
              currentPage === 1 ? styles.disabled : ''
            }`}
          >
            <button
              type="button"
              className={styles.page_link}
              onClick={handlePrevClick}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <img className={styles.img} src={Left} alt="" />
            </button>
          </li>

          {visiblePages.map((page, idx) =>
            page === '...' ? (
              <li key={`dots-${idx}`} className={styles.page_item}>
                <span className={styles.dots} aria-hidden="true">
                  ...
                </span>
              </li>
            ) : (
              <li
                key={page}
                className={`${styles.page_item} ${
                  currentPage === page ? styles.active : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.page_link}
                  onClick={() => onPageChange(Number(page))}
                  aria-current={currentPage === page ? 'page' : undefined}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              </li>
            ),
          )}

          <li
            className={`${styles.page_item} ${
              currentPage === totalPages ? styles.disabled : ''
            }`}
          >
            <button
              type="button"
              className={styles.page_link}
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <img className={styles.img} src={Right} alt="" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
