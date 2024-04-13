import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { getChevronIconSrc } from '../../servises/iconSrc';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useTheme();
  const chevronIconSrc = getChevronIconSrc(theme);
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isCurrentPage = (page: number) => currentPage === page;

  const visiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
    const endPage = Math.min(totalPages, startPage + 3);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  const goPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const selectPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const goNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={classNames(styles.button, {
          [styles.disabled]: isFirstPage,
        })}
        onClick={goPreviousPage}
        disabled={isFirstPage}
      >
        <img
          src={chevronIconSrc}
          alt="Previous page"
          className={classNames(styles.chevronIcon, styles.previous)}
        />
      </button>
      {visiblePages().map(page => (
        <button
          type="button"
          key={page}
          className={classNames(styles.button, {
            [styles.active]: currentPage === page,
          })}
          onClick={() => selectPage(page)}
          disabled={isCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={classNames(styles.button, {
          [styles.disabled]: isLastPage,
        })}
        onClick={goNextPage}
        disabled={isLastPage}
      >
        <img
          src={chevronIconSrc}
          alt="Next page"
          className={classNames(styles.chevronIcon, styles.next)}
        />
      </button>
    </ul>
  );
};
