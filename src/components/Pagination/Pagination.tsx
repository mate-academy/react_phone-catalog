import classNames from 'classnames';

import styles from './Pagination.module.scss';

type PageItem = number | 'start-dots' | 'end-dots';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end-dots', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'start-dots',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'start-dots',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'end-dots',
    totalPages,
  ];
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      <div className={styles.pages}>
        {pageItems.map(pageItem => {
          if (typeof pageItem !== 'number') {
            return (
              <span className={styles.dots} key={pageItem}>
                ...
              </span>
            );
          }

          return (
            <button
              key={pageItem}
              type="button"
              className={classNames(styles.button, {
                [styles.buttonActive]: pageItem === currentPage,
              })}
              onClick={() => onPageChange(pageItem)}
            >
              {pageItem}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </nav>
  );
};
