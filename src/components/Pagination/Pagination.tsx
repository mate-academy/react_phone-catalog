import cn from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={cn(styles.btn, {
              [styles.disabled]: currentPage === 1,
            })}
            disabled={currentPage === 1}
            aria-label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i className="fas fa-chevron-left" />
          </button>
        </li>

        {pages.map(page => {
          return (
            <li key={page}>
              <button
                type="button"
                className={cn(styles.btn, {
                  [styles.active]: page === currentPage,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className={cn(styles.btn, {
              [styles.disabled]: currentPage === totalPages,
            })}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
