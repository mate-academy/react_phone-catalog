import styles from './ProductPagination.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../../../../shared/utils/searchHelper';
import { getClassName } from '../../../../shared/utils/classNameActive';

import RightArrow from '../../../../assets/icons/slider-icons/right-arrow.svg';
import LeftArrow from '../../../../assets/icons/slider-icons/left-arrow.svg';

type Props = {
  currentPage: string;
  visiblePages: number[];
  searchParams: URLSearchParams;
  handlePage: (value: string) => void;
};

export const ProductPagination: React.FC<Props> = ({
  currentPage,
  visiblePages,
  searchParams,
  handlePage,
}) => {
  return (
    <div className={styles.product__pagination}>
      <button
        className={styles.product__LeftBtn}
        onClick={() => handlePage('prev')}
      >
        <img
          src={LeftArrow}
          alt="Перейти на попередню сторінку"
          className={styles.product__BtnImg}
        />
      </button>
      {visiblePages.map(page => (
        <Link
          to={{
            search: getSearchWith(searchParams, { page: page.toString() }),
          }}
          className={getClassName({
            isActive: page === +currentPage,
            baseClass: styles.product__paginationNums,
            activeClass: styles.product__paginationNumsActive,
          })}
          onClick={() => scrollTo(0, 0)}
          key={page}
        >
          {page}
        </Link>
      ))}

      <button
        className={styles.product__rightBtn}
        onClick={() => handlePage('next')}
        aria-label="Перейти на наступну сторінку"
      >
        <img
          src={RightArrow}
          alt="Перейти на наступну сторінку"
          className={styles.product__BtnImg}
        />
      </button>
    </div>
  );
};
