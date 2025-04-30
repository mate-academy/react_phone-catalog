import arrowGray from 'assets/img/icons/arrow-back-dark-gray.svg';
import arrowWhite from 'assets/img/icons/arrow-back-white.svg';
import classNames from 'classnames';

import { getVisiblePages } from 'shared/helpers/getVisiblePages';

import styles from './Pagination.module.scss';

type Props = {
  totalItems: number;
  perPage: number;
  curPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  curPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const visiblePages = getVisiblePages(totalPages, curPage);
  const isFirstPageSelected = curPage === 1;
  const isLastPageSelected = curPage === totalPages;

  const handleChangePage = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li>
          <button
            className={classNames(styles.button, styles.buttonPrev, {
              [styles.buttonDisabled]: isFirstPageSelected,
            })}
            disabled={isFirstPageSelected}
            onClick={() => handleChangePage(curPage - 1)}
          >
            <img
              alt="arrow-back"
              src={isFirstPageSelected ? arrowGray : arrowWhite}
            />
          </button>
        </li>

        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === 'dots' ? (
              <span className={classNames(styles.button, styles.buttonDots)}>
                ...
              </span>
            ) : (
              <button
                className={classNames(styles.button, styles.buttonPage, {
                  [styles.buttonActive]: page === curPage,
                })}
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            className={classNames(styles.button, styles.buttonNext, {
              [styles.buttonDisabled]: isLastPageSelected,
            })}
            disabled={isLastPageSelected}
            onClick={() => handleChangePage(curPage + 1)}
          >
            <img
              alt="arrow-forward"
              src={isLastPageSelected ? arrowGray : arrowWhite}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};
