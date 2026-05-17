import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './CurrentPage.module.scss';

import { getPageTitle } from '../../utils/getPageTitle';
import { PageTitle } from '../../constants/pageTitle';
import { Product } from '../../types/Product/Product';

import HomeIcon from '../../../assets/icons/currentPage/home-icon.svg';
import HomeArrow from '../../../assets/icons/currentPage/home-arrow.svg';
import BackArrow from '../../../assets/icons/currentPage/back-arrow-icon.svg';
import { getClassLink } from '../../utils/activeClassName';

type Props = {
  showProductsCount?: number;
  currentProduct?: Product;
};

export const CurrentPage: React.FC<Props> = ({
  showProductsCount,
  currentProduct,
}) => {
  const { pathname } = useLocation();
  const segments = pathname.split('/');
  const path = segments[1] || '';
  const slug = segments[2] || '';

  const title = getPageTitle(path);
  const itemTitle =
    path.slice(0, 1).toUpperCase() + path.slice(1).toLowerCase();
  const itemLabel = title === PageTitle.Favorites ? 'items' : 'models';

  return (
    <div className={styles.currentPage}>
      <div className={styles.currentPage__wrapper}>
        <Link to="/" className={styles.currentPage__homeLink}>
          <img
            loading="lazy"
            src={HomeIcon}
            alt="Іконка домашньої сторінки"
            className={styles.currentPage__homeImg}
          />
        </Link>

        <div className={styles.currentPage__location}>
          <img
            src={HomeArrow}
            alt="Стрілка поточної сторінки"
            loading="lazy"
            className={styles.currentPage__arrow}
          />
          <Link
            to={`/${path}`}
            className={getClassLink({
              isActive: !!slug,
              baseClass: styles.currentPage__currentTitle,
              activeClass: styles.currentPage__currentTitleActive,
            })}
          >
            {itemTitle}
          </Link>
        </div>
        {slug && (
          <div className={styles.currentPage__location}>
            <img
              src={HomeArrow}
              alt="Стрілка поточної сторінки"
              loading="lazy"
              className={styles.currentPage__arrow}
            />
            <Link
              to={`${pathname}`}
              className={styles.currentPage__currentTitle}
            >
              {currentProduct?.name}
            </Link>
          </div>
        )}
      </div>
      {slug ? (
        <>
          <div className={styles.currentPage__backButtonWrapper}>
            <img
              src={BackArrow}
              alt="Повернутись до попередньої сторінки"
              className={styles.currentPage__backArrowImg}
            />
            <Link to={`/${path}`} className={styles.currentPage__backButton}>
              Back
            </Link>
          </div>
          <h2 className={styles.currentPage__productTitle}>
            {currentProduct?.name}
          </h2>
        </>
      ) : (
        <h1 className={styles.currentPage__productTitle}>{title}</h1>
      )}
      {!!showProductsCount && !slug && (
        <p
          className={styles.currentPage__items}
        >{`${showProductsCount} ${itemLabel}`}</p>
      )}
    </div>
  );
};
