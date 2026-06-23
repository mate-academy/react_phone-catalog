import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { getPages } from '../../utils/getPages';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getPages(currentPage, totalPages, 1);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (page: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
      goToTop();
    }
  };

  const handlePrev = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      goToTop();
    }
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      goToTop();
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__wrapper}>
        <div
          className={classNames(styles.pagination__nav, {
            [styles.pagination__navDisabled]: currentPage === 1,
          })}
        >
          <a
            className={classNames(
              styles.pagination__btn,
              styles.pagination__btnPrev,
              { [styles.pagination__btnDisabled]: currentPage === 1 },
            )}
            href="#"
            aria-disabled={currentPage === 1}
            onClick={handlePrev}
          >
            <img
              src={
                currentPage === 1
                  ? `icons/arrow-slider-disabled.svg`
                  : `icons/arrow-slider.svg`
              }
              alt="Prev icon btn"
            />
          </a>
        </div>

        <ul className={styles.pagination__list}>
          {pages.map((page, index) => (
            <li key={index} className={styles.pagination__item}>
              {page === '...' ? (
                <span className={styles.pagination__num}>...</span>
              ) : (
                <a
                  className={classNames(styles.pagination__num, {
                    [styles.pagination__numActive]: page === currentPage,
                  })}
                  href="#"
                  onClick={handleClick(page as number)}
                >
                  {page}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div
          className={classNames(styles.pagination__nav, {
            [styles.pagination__navDisabled]: currentPage === totalPages,
          })}
        >
          <a
            className={classNames(
              styles.pagination__btn,
              styles.pagination__btnNext,
              { [styles.pagination__btnDisabled]: currentPage === totalPages },
            )}
            href="#"
            aria-disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <img
              src={
                currentPage === totalPages
                  ? `icons/arrow-slider-disabled.svg`
                  : `icons/arrow-slider.svg`
              }
              alt="Next icon btn"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
