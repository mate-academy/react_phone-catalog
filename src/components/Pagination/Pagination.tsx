import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

const VISIBLE_PAGES = 4;

export const Pagination = ({
  total,
  perPage,
  currentPage,
  searchParams,
  setSearchParams,
}: Props) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const params = new URLSearchParams(searchParams);
  const startIndex =
    currentPage > VISIBLE_PAGES ? currentPage - VISIBLE_PAGES : 0;
  const endIndex = startIndex + VISIBLE_PAGES;

  const handlePageChange = (value: number) => {
    if (value === 1) {
      params.delete('page');
    } else {
      params.set('page', value.toString());
    }

    setSearchParams(params);
  };

  const handleLeft = () => {
    if (currentPage === 1) {
      return;
    }

    const newPage = currentPage - 1;

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }

    setSearchParams(params);
  };

  const handleRight = () => {
    if (currentPage === numberOfPages) {
      return;
    }

    const newPage = currentPage + 1;

    params.set('page', newPage.toString());

    setSearchParams(params);
  };

  if (numberOfPages === 1) {
    return;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.customArrow}
        disabled={currentPage === 1}
        onClick={() => handleLeft()}
      >
        <img
          src={
            currentPage === 1
              ? `img/icons/arrow-left-disabled.svg`
              : `img/icons/arrow-left.svg`
          }
        />
      </button>
      <div className={styles.pages}>
        {[...pages].slice(startIndex, endIndex).map(page => (
          <button
            key={page}
            className={classNames(styles.page, {
              [styles.active]: page === currentPage,
            })}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={styles.customArrow}
        disabled={currentPage === numberOfPages}
        onClick={() => handleRight()}
      >
        <img
          src={
            currentPage === numberOfPages
              ? `img/icons/arrow-right-disabled.svg`
              : `img/icons/arrow-right.svg`
          }
        />
      </button>
    </div>
  );
};
