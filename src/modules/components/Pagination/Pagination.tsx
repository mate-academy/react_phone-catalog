import classNames from 'classnames';
import { SearchLink } from '@components/SearchLink';
import arrowNext from '@img/icons/arrow-right.svg';
import arrowNextWhite from '@img/icons/arrow-right-white.svg';
import arrowNextBlack from '@img/icons/arrow-right-black.svg';
import arrowBack from '@img/icons/arrow-left.svg';
import arrowBackWhite from '@img/icons/arrow-left-white.svg';
import arrowBackBlack from '@img/icons/arrow-left-black.svg';
import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  isLightMode: boolean;
  handlerPageSelector: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  isLightMode,
  handlerPageSelector,
}) => {
  const getPageNumbers = () => {
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    let startPage = Math.max(currentPage - maxVisiblePages + 1, 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxVisiblePages + 1;
    }

    return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
  };

  const searchPage = (page: string) => {
    return {
      page: page,
    };
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__arrow}
        onClick={() => handlerPageSelector(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          className={styles.pagination__image}
          src={
            !isLightMode
              ? currentPage === 1
                ? arrowBack
                : arrowBackWhite
              : currentPage === 1
                ? arrowBackWhite
                : arrowBackBlack
          }
          alt="Pagination-arrow-back"
        />
      </button>
      <div className={styles.pagination__pages}>
        {getPageNumbers().map(page => (
          <SearchLink
            params={searchPage(page.toString())}
            key={page}
            onClick={() => handlerPageSelector(page)}
            className={classNames(styles.pagination__page, {
              [styles['pagination__page--active']]: page === currentPage,
            })}
          >
            {page}
          </SearchLink>
        ))}
      </div>
      <button
        className={styles.pagination__arrow}
        onClick={() => handlerPageSelector(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          className={styles.pagination__image}
          src={
            !isLightMode
              ? currentPage === totalPages
                ? arrowNext
                : arrowNextWhite
              : currentPage === totalPages
                ? arrowNextWhite
                : arrowNextBlack
          }
          alt="Pagination-arrow-next"
        />
      </button>
    </div>
  );
};
