import classNames from 'classnames';

import { Icon } from 'shared/components/ui/Icon/Icon';
import { IconNames } from 'shared/components/ui/Icon/IconNames';
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
            className={classNames(styles.buttonArrow, {
              [styles.buttonDisabled]: isFirstPageSelected,
            })}
            disabled={isFirstPageSelected}
            type="button"
            onClick={() => handleChangePage(curPage - 1)}
          >
            <Icon className={styles.arrowPrev} name={IconNames.Arrow} />
          </button>
        </li>

        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === 'dots' ? (
              <div className={styles.dots}>...</div>
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
            className={classNames(styles.buttonArrow, {
              [styles.buttonDisabled]: isLastPageSelected,
            })}
            disabled={isLastPageSelected}
            onClick={() => handleChangePage(curPage + 1)}
          >
            <Icon name={IconNames.Arrow} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
