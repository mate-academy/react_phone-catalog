import { FC } from 'react';
import classNames from 'classnames';
import { Page } from '../../types/Page';
import styles from './Pagination.module.scss';

const LEFT_ARROW_PATH =
  'M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 ' +
  '9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 ' +
  '5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 ' +
  '12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 ' +
  '12.2111 10.7318 11.789 10.4715 11.5286L6.94289 ' +
  '8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 ' +
  '3.78896 10.4715 3.52861Z';

const RIGHT_ARROW_PATH =
  'M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 ' +
  '6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 ' +
  '10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 ' +
  '12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 ' +
  '12.2111 5.26841 11.789 5.52876 11.5286L9.05735 ' +
  '8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 ' +
  '3.78896 5.52876 3.52861Z';

type Props = {
  currentPage: number;
  totalPages: number;
  visiblePages: Page[];
  handlePageChange: (pageNumber: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  visiblePages,
  handlePageChange,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__arrowButton,
        )}
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={LEFT_ARROW_PATH}
            fill="currentColor"
          />
        </svg>
      </button>
      <div className={styles.pagination__buttons}>
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span className={styles.pagination__dots} key={`dots-${index}`}>
                ...
              </span>
            );
          }

          return (
            <button
              className={classNames(styles.pagination__button, {
                [styles.pagination__buttonActive]: currentPage === page,
              })}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__arrowButton,
        )}
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={RIGHT_ARROW_PATH}
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
