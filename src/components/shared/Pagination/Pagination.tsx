import styles from './Pagination.module.scss';

type Props = {
  perPage: number;
  total: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(total / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className={styles.pagination}>
      <li
        className={`
        ${styles.pagination__item}
        ${styles['pagination__item--firstPage']}
        ${isFirstPage ? styles['pagination__item--disabled'] : ''}`}
      >
        <button
          data-cy="prevLink"
          className={styles.pagination__link}
          disabled={isFirstPage}
          onClick={() => !isFirstPage && prevPage()}
        >
          «
        </button>
      </li>

      {pageNumbers.map(n => (
        <li
          key={n}
          className={`${styles.pagination__item} ${currentPage === n ? styles['pagination__item--active'] : ''}`}
        >
          <button
            data-cy="pageLink"
            className={styles.pagination__link}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        </li>
      ))}

      <li
        className={`
        ${styles.pagination__item}
        ${styles['pagination__item--lastPage']}
        ${isLastPage ? styles['pagination__item--disabled'] : ''}`}
      >
        <button
          data-cy="nextLink"
          className={styles.pagination__link}
          disabled={isLastPage}
          onClick={() => !isLastPage && nextPage()}
        >
          »
        </button>
      </li>
    </ul>
  );
};
