import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductPaginaton.module.scss';

import { getSearchWith } from '../../../../shared/utils/searchHelper';
import { getClassLink } from '../../../../shared/utils/activeClassName';

import LeftArrow from '../../../../assets/icons/productPage/left-arrow.svg';
import RightArrow from '../../../../assets/icons/productPage/right-arrow.svg';

type Props = {
  currentPage: string;
  visilbePages: number[];
  searchParams: URLSearchParams;
  handlePage: (value: string) => void;
};

export const ProductPaginaton: React.FC<Props> = ({
  currentPage,
  visilbePages,
  searchParams,
  handlePage,
}) => {
  return (
    <div className={styles.product__pagination}>
      <button
        aria-label="Перейти на попередню сторінку"
        className={styles.product__LeftBtn}
        onClick={() => handlePage('prev')}
      >
        <img
          src={LeftArrow}
          alt="Перейти на попередню сторінку"
          className={styles.product__BtnImg}
        />
      </button>
      {visilbePages.map(page => (
        <Link
          to={{
            search: getSearchWith(searchParams, { page: page.toString() }),
          }}
          className={getClassLink({
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
