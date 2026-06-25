import cn from 'classnames';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../shared/ui/Icons/Icons';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination} data-cy="pagination">
      <li>
        <a
          data-cy="prevLink"
          href="#prev"
          className={cn(styles.link, styles.linkArrow, {
            [styles.linkDisabled]: currentPage === 1,
          })}
          aria-disabled={currentPage === 1}
          onClick={event => {
            event.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <ChevronLeftIcon />
        </a>
      </li>

      {pages.map(page => (
        <li key={page}>
          <a
            data-cy="pageLink"
            href={`#${page}`}
            className={cn(styles.link, {
              [styles.linkActive]: page === currentPage,
            })}
            onClick={event => {
              event.preventDefault();
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li>
        <a
          data-cy="nextLink"
          href="#next"
          className={cn(styles.link, styles.linkArrow, {
            [styles.linkDisabled]: currentPage === pageCount,
          })}
          aria-disabled={currentPage === pageCount}
          onClick={event => {
            event.preventDefault();
            if (currentPage < pageCount) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <ChevronRightIcon />
        </a>
      </li>
    </ul>
  );
};
