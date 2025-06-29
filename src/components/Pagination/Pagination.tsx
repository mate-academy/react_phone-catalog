import styles from './Pagination.module.scss';

import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';

type Props = {
  totalItems: number;
};

export const Pagination: React.FC<Props> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage');
  const limit = perPage === 'all' || !perPage ? totalItems : Number(perPage);
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', String(newPage));
    }

    setSearchParams(newSearchParams);
  };

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (page <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', page, '...', totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className={styles.pagination__buttonPrev}
        aria-label="Previous page"
      >
        <img src={arrowLeftIcon} />
      </button>

      <div className={styles.pagination__buttonItems}>
        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={classNames(styles.pagination__buttonNum, {
                [styles['pagination__buttonNum--active']]: p === page,
              })}
            >
              {p}
            </button>
          ) : (
            <span key={`dots-${idx}`} className={styles.pagination__dots}>
              ...
            </span>
          ),
        )}
      </div>

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className={styles.pagination__buttonNext}
        aria-label="Next page"
      >
        <img src={arrowRightIcon} />
      </button>
    </div>
  );
};
