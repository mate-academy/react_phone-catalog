import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import styles from './Pagination.module.scss';
import arrow_black from '/img/arrow-black.svg';
import arrow_grey from '/img/arrow-grey.svg';
import React from 'react';

type Props = {
  totalPages: number;
  visiblePages: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  visiblePages,
  currentPage,
}) => {
  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages > visiblePages) {
    pages = [
      ...new Set([
        1,
        totalPages,
        currentPage,
        currentPage - 1,
        currentPage + 1,
      ]),
    ]
      .filter(num => num !== 0 && num <= totalPages)
      .sort((a, b) => a - b);
  }

  const paginationButtons = (
    <div className={styles.pagination_buttons}>
      {pages.map((page, index) => {
        return (
          <React.Fragment key={page}>
            <SearchLink
              params={{ page: String(page) }}
              className={classNames(styles.pagination_button, {
                [styles.is_active]: page === currentPage,
              })}
            >
              {page}
            </SearchLink>

            {pages[index + 1] - pages[index] > 1 && (
              <div className={styles.divider}>...</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className={styles.pagination}>
      {currentPage > 1 ? (
        <SearchLink params={{ page: String(currentPage - 1) }}>
          <button className={styles.slider} disabled={currentPage === 1}>
            <img src={arrow_black} alt="arrow" className={styles.arrow_left} />
          </button>
        </SearchLink>
      ) : (
        <button className={styles.slider} disabled={currentPage === 1}>
          <img src={arrow_grey} alt="arrow" className={styles.arrow_left} />
        </button>
      )}

      {paginationButtons}

      {currentPage < totalPages ? (
        <SearchLink params={{ page: String(currentPage + 1) }}>
          <button
            className={styles.slider}
            disabled={currentPage === totalPages}
          >
            <img src={arrow_black} alt="arrow" className={styles.arrow_right} />
          </button>
        </SearchLink>
      ) : (
        <button className={styles.slider} disabled={currentPage === totalPages}>
          <img src={arrow_grey} alt="arrow" className={styles.arrow_right} />
        </button>
      )}
    </div>
  );
};
