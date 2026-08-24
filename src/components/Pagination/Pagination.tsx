import styles from './pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, goToPage }: Props) => {
  const visiblePages = 4;
  let startPage = 1;

  if (currentPage >= visiblePages) {
    startPage = currentPage - visiblePages + 2;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  startPage = Math.min(startPage, totalPages - visiblePages + 1);
  startPage = Math.max(startPage, 1);

  const pages = Array.from(
    { length: Math.min(visiblePages, totalPages) },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__arrows}
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        <img
          className={styles.pagination__arrow}
          src={
            isFirstPage
              ? `${import.meta.env.BASE_URL}/img/icons/disabled-arrow-left.svg`
              : `${import.meta.env.BASE_URL}/img/icons/ArrowLeft.svg`
          }
          alt="previous page"
        />
        <img
          className={styles.pagination__arrowDark}
          src={
            isFirstPage
              ? `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-left.svg`
              : `${import.meta.env.BASE_URL}/img/icons-dark/Arrow–left.svg`
          }
          alt="previous page"
        />
      </button>

      <div className={styles.pagination__buttons}>
        {pages.map(page => (
          <button
            type="button"
            key={page}
            onClick={() => goToPage(page)}
            className={
              currentPage === page
                ? styles.activePage
                : styles.pagination__button
            }
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.pagination__arrows}
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
      >
        <img
          className={styles.pagination__arrow}
          src={
            isLastPage
              ? `${import.meta.env.BASE_URL}/img/icons/disabled-arrow-right.svg`
              : `${import.meta.env.BASE_URL}/img/icons/ArrowRight.svg`
          }
          alt="next page"
        />
        <img
          className={styles.pagination__arrowDark}
          src={
            isLastPage
              ? `${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-right.svg`
              : `${import.meta.env.BASE_URL}/img/icons-dark/Arrow-right.svg`
          }
          alt="next page"
        />
      </button>
    </div>
  );
};
