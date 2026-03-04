/* eslint-disable max-len */
import { FC } from 'react';
import styles from './CatalogPagination.module.scss';
import arrowRightWhite from './../../../../../public/img/icons/arrowRightWhite.svg';
import arrowLeftWhite from './../../../../../public/img/icons/arrowLeftWhite.svg';

type Props = {
  pages: number[];
  handlePage: (val: number) => void;
  currentPage: number;
};

export const CatalogPagination: FC<Props> = ({
  pages,
  handlePage,
  currentPage,
}) => {
  const widthPagination = 5;
  const totalPages = pages.length;
  const center = Math.ceil(widthPagination / 2);
  let from = currentPage - (center - 1);
  let to = from + widthPagination - 1;

  if (from < 1) {
    from = 1;
    to = Math.min(widthPagination, totalPages);
  }

  if (to > totalPages) {
    to = totalPages;
    from = Math.max(1, totalPages - widthPagination + 1);
  }

  const visiblePages = [];

  for (let i = from; i <= to; i++) {
    visiblePages.push(i);
  }

  return (
    <>
      {totalPages !== 0 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              handlePage(currentPage - 1);
            }}
            className={styles.arrow}
          >
            <img src={arrowLeftWhite} alt="arrowLeftWhite" />
          </button>
          <div className={styles.pages__buttons}>
            {visiblePages.map((page, index) => {
              return (
                <button
                  onClick={() => {
                    handlePage(page);
                  }}
                  key={index}
                  className={`${styles.button} ${Number(currentPage) === page ? styles.button__active : ''}`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              handlePage(currentPage + 1);
            }}
            className={styles.arrow}
          >
            <img src={arrowRightWhite} alt="arrowRightWhite" />
          </button>
        </div>
      )}
    </>
  );
};
