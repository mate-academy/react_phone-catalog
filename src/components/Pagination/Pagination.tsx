import cn from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
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
          >
            <i className="fas fa-chevron-left" />
          </button>
        </li>

        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={cn(styles.btn, {
                [styles.active]: page === currentPage,
              })}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            className={cn(styles.btn, {
              [styles.disabled]: currentPage === totalPages,
            })}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
