import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addFavorite, removeFavorite } from '../../features/favoritesSlice';
import { addItemToCart, removeItemFromCart } from '../../features/cartSlice';
import heartLight from '../../images/icon-heart-light-theme.svg';
import heartDark from '../../images/icon-heart-dark-theme.svg';
import favFilledHeart from '../../images/icon-filled-heart-fav-red.svg';
import styles from './ProductCard.module.scss';
import { toast } from 'react-hot-toast';

type Props = {
  product: Product;
  discount?: boolean;
  slash?: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, slash, discount }) => {
    const { image, name, price, screen, capacity, ram, fullPrice } = product;

    const { theme } = useAppSelector(state => state.theme);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { favoriteProducts } = useAppSelector(state => state.favorites);
    const { cartProducts } = useAppSelector(state => state.cart);

    const handleFavorites = (prod: Product) => {
      if (favoriteProducts.some(item => item.id === prod.id)) {
        dispatch(removeFavorite(prod));
      } else {
        dispatch(addFavorite(prod));
      }
    };

    const handleCart = (prod: Product) => {
      if (cartProducts.some(item => item.id === prod.id)) {
        dispatch(removeItemFromCart(prod.id));
        toast(t('productCard.toast.removed', { name: prod.name }), {
          icon: '🛒',
        });
      } else {
        dispatch(addItemToCart(prod));
        toast.success(t('productCard.toast.added', { name: prod.name }));
      }
    };

    const isFavorite = favoriteProducts.some(item => item.id === product.id);
    const isInCart = cartProducts.some(prod => prod.id === product.id);

    return (
      <div className={styles.productCard}>
        <div className={styles.content}>
          <Link
            to={`/${product.category}/:${product.itemId}`}
            className={styles.link}
          >
            {slash ? (
              <img src={`/${image}`} alt={name} className={styles.img} />
            ) : (
              <img src={image} alt={name} className={styles.img} />
            )}
          </Link>

          <Link
            to={`/${product.category}/:${product.itemId}`}
            className={styles.title}
          >
            {name}
          </Link>
          <div className={styles.priceBox}>
            <p className={styles.currentPrice}>{`$${price}`}</p>
            {discount && (
              <p className={styles.fullPrice}>
                {`$${fullPrice}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 10"
                  className={styles.fullPrice__curvyLine}
                >
                  <path
                    d="M0 8 Q 50 -10, 100 8"
                    stroke="#89939a"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeWidth="3.5"
                  />
                </svg>
              </p>
            )}
          </div>

          <span className={styles.line}></span>

          <div className={styles.specsContainer}>
            <div className={styles.specs}>
              <div className={styles.title}>
                {t('productCard.specs.screen')}
              </div>
              <div className={styles.param}>{screen}</div>
            </div>

            <div className={styles.specs}>
              <div className={styles.title}>
                {t('productCard.specs.capacity')}
              </div>
              <div className={styles.param}>{capacity}</div>
            </div>

            <div className={styles.specs}>
              <div className={styles.title}>{t('productCard.specs.ram')}</div>
              <div className={styles.param}>{ram}</div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              className={classNames(styles.cartBtn, {
                [styles['cartBtn--active']]: isInCart,
              })}
              onClick={() => handleCart(product)}
            >
              {isInCart
                ? t('productCard.button.added')
                : t('productCard.button.add')}
            </button>

            <button
              className={classNames(styles.favBtn, {
                [styles['favBtn--active']]: isFavorite,
              })}
              onClick={() => handleFavorites(product)}
            >
              <img
                src={
                  isFavorite
                    ? favFilledHeart
                    : theme === 'light'
                      ? heartLight
                      : heartDark
                }
                alt="Favorites"
                className={styles.favImg}
              />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';
