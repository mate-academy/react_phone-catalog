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

  return (
    <ul className={styles.buttons}>
      <button
        className={styles.buttonPrev}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <img src="../img/buttons/slider_button_disabled.png" alt="" />
      </button>
      {pages.map(page => (
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
      >
        <img src="../img/buttons/slider_button_right.png" alt="" />
      </button>
    </ul>
  );
};
