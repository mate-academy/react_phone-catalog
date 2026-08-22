import { getNumbers } from '../../../../utils/getNumbers';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const isFirst = currentPage === 1;
  const isLast = currentPage === pagesCount;

  const handleChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pagesCount) {
      onPageChange(page);
    }
  };

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);

  if (pagesCount <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <p className={styles.pagination__info} data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <ul className={styles.pagination__list}>
        <li className={isFirst ? styles['pagination__item--disabled'] : ''}>
          <a
            href="#prev"
            aria-disabled={isFirst}
            className={styles.pagination__link}
            onClick={e => {
              e.preventDefault();
              handleChange(currentPage - 1);
            }}
          >
            <Icon name="chevron-left" />
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage ? styles['pagination__item--active'] : ''
            }
          >
            <a
              href={`#${page}`}
              className={styles.pagination__link}
              onClick={e => {
                e.preventDefault();
                handleChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={isLast ? styles['pagination__item--disabled'] : ''}>
          <a
            href="#next"
            aria-disabled={isLast}
            className={styles.pagination__link}
            onClick={e => {
              e.preventDefault();
              handleChange(currentPage + 1);
            }}
          >
            <Icon name="chevron-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};
