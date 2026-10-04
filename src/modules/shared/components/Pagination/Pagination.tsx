import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

const MAX_VISIBLE_PAGES = 4;

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
  const pagesCount = Math.ceil(total / perPage);

  if (pagesCount <= 1) {
    return null;
  }

  const firstVisible = Math.max(
    1,
    Math.min(currentPage - 1, pagesCount - MAX_VISIBLE_PAGES + 1),
  );
  const lastVisible = Math.min(
    pagesCount,
    firstVisible + MAX_VISIBLE_PAGES - 1,
  );
  const pages = Array.from(
    { length: lastVisible - firstVisible + 1 },
    (_, index) => firstVisible + index,
  );

  return (
    <nav aria-label="Pagination">
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.button}
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icon name="chevron-left" />
          </button>
        </li>

        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={cn(styles.button, {
                [styles.selected]: page === currentPage,
              })}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            className={styles.button}
            aria-label="Next page"
            disabled={currentPage === pagesCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icon name="chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
