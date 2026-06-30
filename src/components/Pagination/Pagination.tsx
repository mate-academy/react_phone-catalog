import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const groupSize = 4;
  const numberGroup = Math.ceil(currentPage / groupSize);
  const firstPage = (numberGroup - 1) * groupSize + 1;
  const lastPage = Math.min(firstPage + groupSize - 1, totalPages);
  const visiblePages = pages.filter(
    page => page >= firstPage && page <= lastPage,
  );

  return (
    <ul className={styles.buttons}>
      <button
        className={styles.buttonPrev}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      ></button>
      {visiblePages.map(page => (
        <li key={page} className={styles.buttonsList}>
          <button
            onClick={() => onPageChange(page)}
            className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </button>
        </li>
      ))}
      <button
        className={styles.buttonNext}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      ></button>
    </ul>
  );
};
