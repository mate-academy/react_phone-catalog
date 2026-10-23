import styles from './Pagination.module.scss';
import ArrowLeft from '../../../img/icons/Arrow Left.svg';
import ArrowRight from '../../../img/icons/Arrow Right.svg';

type Props = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ total, current, onChange }: Props) => {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
      >
        <img src={ArrowLeft} alt="Arrow left" />
      </button>

      <ul className={styles.list}>
        {pages.map(pageNumber => (
          <li key={pageNumber}>
            <button
              type="button"
              className={
                pageNumber === current
                  ? `${styles.page} ${styles.pageActive}`
                  : styles.page
              }
              aria-current={pageNumber === current}
              onClick={() => onChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
      >
        <img src={ArrowRight} alt="Arrow right" />
      </button>
    </nav>
  );
};
