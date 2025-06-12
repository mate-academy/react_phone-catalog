import arrowNext from '../../../img/icons/arrow-right.svg';
import arrowNextWhite from '../../../img/icons/arrow-right-white.svg';
import arrowBack from '../../../img/icons/arrow-left.svg';
import arrowBackWhite from '../../../img/icons/arrow-left-white.svg';
import styles from './Pagination.module.scss';
import { SearchLink } from '../SearchLink';

type Props = {
  totalPages: number;
  currentPage: number;
  handlerPageSelector: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
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
          src={currentPage === 1 ? arrowBack : arrowBackWhite}
          alt="Pagination-arrow-back"
        />
      </button>
      <div className={styles.pagination__pages}>
        {getPageNumbers().map(page => (
          <SearchLink
            params={searchPage(page.toString())}
            key={page}
            onClick={() => handlerPageSelector(page)}
            className={`${styles.pagination__page} ${
              page === currentPage ? styles['pagination__page--active'] : ''
            }`}
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
          src={currentPage === totalPages ? arrowNext : arrowNextWhite}
          alt="Pagination-arrow-next"
        />
      </button>
    </div>
  );
};
