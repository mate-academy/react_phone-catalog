import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import 'bulma/css/bulma.min.css';
import { NavLink } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductType } from '../../Helpers/enumProductType';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/productType';
import favoritsIsEmptyImage from './pictures/product-not-found.png';
import { Theme } from '../../Helpers/theme';
import { useAppSelector } from '../../Hooks/hooks';

type Props = {
  type: ProductType[];
  title: string;
};

export const Favorites: React.FC<Props> = ({ title }) => {
  const [favoriteProduct, setFavoriteProduct] = useState<Product[]>([]);

  const favorites = useAppSelector(state => state.cartAndFavorits.favorites);
  const theme = useAppSelector(state => state.theme.theme);

  useEffect(() => {
    setFavoriteProduct(favorites);
  }, [favoriteProduct, favorites]);

  return (
    <>
      <div
        className={
          theme === Theme.light
            ? styles.containerFavorits
            : styles.containerFavoritsDark
        }
      >
        <div className={styles.headerAndMain}>
          <Header />
          <div
            className={
              theme === Theme.light ? styles.background : styles.backgroundDark
            }
          >
            <div className={styles.favoritesWrapper}>
              <section className={styles.favorites}>
                <div className={styles.homeLinkContainer}>
                  <NavLink to={'/'}>
                    <svg
                      className={styles.home}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M7.59087 0.80718C7.83161 0.619937 8.16872 0.619937 8.40946 0.80718L14.4095 5.47385C14.5718 5.60015 14.6668 5.79435 14.6668 6.00008V13.3334C14.6668 13.8638 14.4561 14.3726 14.081 14.7476C13.706 15.1227 13.1973 15.3334 12.6668 15.3334H3.3335C2.80306 15.3334 2.29436 15.1227 1.91928 14.7476C1.54421 14.3726 1.3335 13.8638 1.3335 13.3334V6.00008C1.3335 5.79435 1.42848 5.60015 1.59087 5.47385L7.59087 0.80718ZM2.66683 6.32614V13.3334C2.66683 13.5102 2.73707 13.6798 2.86209 13.8048C2.98712 13.9298 3.15669 14.0001 3.3335 14.0001H12.6668C12.8436 14.0001 13.0132 13.9298 13.1382 13.8048C13.2633 13.6798 13.3335 13.5102 13.3335 13.3334V6.32614L8.00016 2.17799L2.66683 6.32614Z"
                        fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M5.3335 7.99992C5.3335 7.63173 5.63197 7.33325 6.00016 7.33325H10.0002C10.3684 7.33325 10.6668 7.63173 10.6668 7.99992V14.6666C10.6668 15.0348 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0348 9.3335 14.6666V8.66659H6.66683V14.6666C6.66683 15.0348 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0348 5.3335 14.6666V7.99992Z"
                        fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                      />
                    </svg>
                  </NavLink>
                  <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      // eslint-disable-next-line max-len
                      d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                      fill={theme === Theme.light ? '#0F0F11' : '#F1F2F9'}
                    />
                  </svg>
                  <NavLink to={'/phones'}>
                    <span
                      className={
                        theme === Theme.light ? styles.link : styles.linkDark
                      }
                    >
                      {title}
                    </span>
                  </NavLink>
                </div>
                <div className={styles.titleAndItems}>
                  <h1
                    className={
                      theme === Theme.light
                        ? styles.favoritesTitle
                        : styles.favoritesTitleDark
                    }
                  >
                    {title}
                  </h1>
                  <span className={styles.items}>
                    {favoriteProduct.length} items
                  </span>
                </div>
                <div className={styles.products}>
                  {!favoriteProduct.length ? (
                    <picture className={styles.empyFavoritesImg}>
                      <img
                        src={theme === Theme.light ? favoritsIsEmptyImage : ''}
                        alt={theme === Theme.light ? 'Empty Favorites' : ''}
                        className={styles.empyFavoritesImg}
                      />
                    </picture>
                  ) : (
                    <div className={styles.productGrid}>
                      {favoriteProduct.map((item, index) => (
                        <div key={index}>
                          {' '}
                          <ProductCard item={item} type={item.category} />{' '}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default React.memo(Favorites);
