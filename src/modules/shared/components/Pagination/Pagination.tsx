import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number | 'all';
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  if (perPage === 'all' || perPage >= total) {
    return null;
  }

  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="arrow-left" />
      </button>

      <div className={styles.pages}>
        {pages.map(page => (
          <button
            key={page}
            type="button"
            className={classNames(styles.page, {
              [styles.active]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="arrow-right" />
      </button>
    </div>
  );
};
