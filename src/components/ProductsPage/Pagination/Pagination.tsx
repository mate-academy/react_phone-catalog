import React, { useEffect, useState } from 'react';
// import { Products } from '../../../types/Products';
// import { PerPage } from '../../../types/ItemsPerPage';
import styles from './Pagination.module.scss';
import { PerPage } from '../../../types/ItemsPerPage';
import { Products } from '../../../types/Products';
import classNames from 'classnames';

interface Props {
  products: Products[];
  perPage: PerPage;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  products,
  perPage,
  currentIndex,
  setCurrentIndex,
}) => {
  const [onPage, setOnPage] = useState(1);

  useEffect(() => {
    if (perPage === PerPage.All) {
      setOnPage(1);
    } else {
      setOnPage(+perPage);
    }
  }, [perPage]);

  const paginationCounts = Math.ceil(products.length / onPage);
  const handleNextIndex = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentIndex !== paginationCounts - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevIndex = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <nav
      className={`${styles.page__pagination} ${styles.pagination}`}
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`${styles.pagination__button} ${styles['pagination__button--prev']}`}
        onClick={handlePrevIndex}
      ></button>
      <ul className={styles.pagination__list}>
        {[...Array(paginationCounts)].map((_, index) => (
          <li key={index}>
            <a
              href="#"
              className={classNames(
                'pagination-link',
                styles.pagination__link,
                {
                  [styles['pagination__link--active']]: currentIndex === index,
                },
              )}
              aria-label={`Goto page ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.pagination__button} ${styles['pagination__button--next']}`}
        onClick={handleNextIndex}
      ></button>
    </nav>
  );
};
