import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination} data-cy="pagination">
      <button
        className={styles.pagination__btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        data-cy="paginationLeft"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className={styles.pagination__pages}>
        {pages.map(page => (
          <button
            key={page}
            className={classNames(styles.pagination__page, {
              [styles['pagination__page--active']]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.pagination__btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        data-cy="paginationRight"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};
