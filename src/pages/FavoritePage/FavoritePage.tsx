/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { useShop } from '../../components/ShopContext';
import styles from './FavoritePage.module.scss';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';
import { ProductCart } from '../../components/ProductCart';

export const FavoritePage = () => {
  const { state } = useShop();
  const items = Object.values(state.favorites);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={[
          styles.container,
          theme === Theme.LIGHT ? styles['container--light'] : '',
        ].join(' ')}
      >
        <div className={styles.breadcrumb}>
          <Link to="/">
            {theme === Theme.DARK ? (
              <img
                src="img/icons/Home.svg"
                alt="Home"
                className={styles.breadcrumb__icon}
              />
            ) : (
              <img
                src="img/icons/HomeLig.svg"
                alt="Home"
                className={styles.breadcrumb__icon}
              />
            )}
          </Link>
          <img
            src="img/icons/ArrowRight.svg"
            alt="arroe right"
            className={styles.breadcrumb__icon}
          />
          <span className={styles.breadcrumb__currentPage}>Favourites</span>
        </div>
        <section className={styles.container__body}>
          <h1 className={styles.container__body__title}>Favorites</h1>
          <p className={styles.container__body__text}>{items.length} items</p>
          {items.length === 0 ? (
            <div className={styles.container__body__empty}>
              <p className={styles.container__body__empty__text}>
                Product not found
              </p>
              <img
                src="img/product-not-found.png"
                alt="Empty Cart"
                className={styles.container__body__empty__img}
              />
            </div>
          ) : (
            <div className={styles.container__products}>
              {items.map(p => (
                <ProductCart key={p.itemId} product={p} priceMode="both" />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};
