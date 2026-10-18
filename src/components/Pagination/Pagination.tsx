import classNames from 'classnames';
import { getPageNumbers } from '../../utils';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
}: Props) => (
  <nav className={styles.pagination} aria-label="Pagination">
    <button
      type="button"
      className={styles.pagination__button}
      disabled={currentPage === 1}
      aria-label="Previous page"
      onClick={() => onPageChange(currentPage - 1)}
    >
      <Icon name="arrow-left" />
    </button>

    {getPageNumbers(pagesCount, currentPage).map(page => (
      <button
        key={page}
        type="button"
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--active']]: page === currentPage,
        })}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ))}

    <button
      type="button"
      className={styles.pagination__button}
      disabled={currentPage === pagesCount}
      aria-label="Next page"
      onClick={() => onPageChange(currentPage + 1)}
    >
      <Icon name="arrow-right" />
    </button>
  </nav>
);
