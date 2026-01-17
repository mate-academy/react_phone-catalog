import styles from './Paginator.module.scss';
import { Fragment } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i <= 3 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    }
  }

  return (
    <div className={styles.paginator}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${styles.buttonLeft} ${styles.button}`}
      ></button>
      {pages.map((page, index) => {
        const prev = pages[index - 1];

        return (
          <Fragment key={page}>
            {prev && page - prev > 1 && (
              <span className={styles.dots}>...</span>
            )}
            <span>
              <button
                className={
                  page === currentPage
                    ? `${styles.active} ${styles.button}`
                    : styles.button
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </span>
          </Fragment>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${styles.buttonRight} ${styles.button}`}
      ></button>
    </div>
  );
};
