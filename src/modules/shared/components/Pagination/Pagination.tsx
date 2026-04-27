import classNames from 'classnames';
import { getPageNumbers } from '../../utils/catalog';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={classNames(styles.button, {
            [styles.buttonActive]: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
};
