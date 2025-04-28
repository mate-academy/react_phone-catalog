import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './CurrentPage.module.scss';

import { getPageTitle } from '../../utils/getPageTitle';
import { PageTitle } from '../../constants/pageTitle';

type Props = {
  showProductsCount?: number;
};

export const CurrentPage: React.FC<Props> = ({ showProductsCount }) => {
  const { pathname } = useLocation();
  const normalizedPathName = pathname.replace('/', '');

  const title = getPageTitle(normalizedPathName);

  return (
    <div className={styles.currentPage}>
      <div className={styles.currentPage__wrapper}>
        <a href="#" className={styles.currentPage__homeLink}>
          <img
            loading="lazy"
            src="src/assets/images/currentPage/home-icon.svg"
            alt="Іконка домашньої сторінки"
            className={styles.currentPage__homeImg}
          />
        </a>

        <div className={styles.currentPage__location}>
          <img
            src="src/assets/images/currentPage/home-arrow.svg"
            alt="Стрілка поточної сторінки"
            loading="lazy"
            className={styles.currentPage__arrow}
          />
          <a href="#" className={styles.currentPage__currentTitle}>
            {title}
          </a>
        </div>
      </div>
      <h1 className={styles.currentPage__productTitle}>{title}</h1>
      {!!showProductsCount &&
        (title === PageTitle.Favorites ? (
          <p
            className={styles.currentPage__items}
          >{`${showProductsCount} items`}</p>
        ) : (
          <p
            className={styles.currentPage__items}
          >{`${showProductsCount} models`}</p>
        ))}
    </div>
  );
};
