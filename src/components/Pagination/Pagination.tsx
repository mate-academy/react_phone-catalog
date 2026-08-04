import classNames from 'classnames';

import arrowRightIcon from '../../assets/icons/slider-buttor-right.svg';

import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.pagination} aria-label="Products pagination">
      <button
        type="button"
        className={styles.arrowButton}
        onClick={handlePreviousPage}
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        <img
          src={arrowRightIcon}
          alt=""
          className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
        />
      </button>

      <div className={styles.pages}>
        {pages.map(page => (
          <button
            key={page}
            type="button"
            className={classNames(styles.pageButton, {
              [styles.pageButtonActive]: page === currentPage,
            })}
            onClick={() => {
              onPageChange(page);
            }}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrowButton}
        onClick={handleNextPage}
        disabled={isLastPage}
        aria-label="Next page"
      >
        <img src={arrowRightIcon} alt="" className={styles.arrowIcon} />
      </button>
    </nav>
  );
};
