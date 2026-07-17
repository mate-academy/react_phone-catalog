import { forwardRef } from 'react';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import {
  useAccessories,
  usePhones,
  useTablets,
} from '../../../hooks/useProducts';
import { useCart } from '../../../context/CartContext';
import { Product } from '../../../types/Product';
import classNames from 'classnames';
import { useFavourites } from '../../../context/FavouriteContext';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  image: string;
  name: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const Card = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { id, image, name, fullPrice, price, screen, capacity, ram } = props;
  const { addToCart, items, removeFromCart } = useCart();
  const { addToFavourites, favouriteItems, removeFromFavourites } =
    useFavourites();
  const { t } = useTranslation();

  const shortenedScreen = screen.split(' ').slice(0, 2).join(' ');

  const phones: Product[] = usePhones();
  const tablets: Product[] = useTablets();
  const accessories: Product[] = useAccessories();

  const allDetailedProducts: Product[] = [
    ...phones,
    ...tablets,
    ...accessories,
  ];

  const handleAddToCart = (productId: string) => {
    const readyProduct = allDetailedProducts.find(
      product => product.id === productId,
    );

    if (!readyProduct) {
      return;
    }

    addToCart(readyProduct);
  };

  const handleAddToFavorites = (productId: string) => {
    const readyProduct = allDetailedProducts.find(
      product => product.id === productId,
    );

    if (!readyProduct) {
      return;
    }

    addToFavourites(readyProduct);
  };

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.topSide}>
        <div className={styles.imageSection}>
          <div className={styles.image}>
            <Link to={`/product/${id}`}>
              <img className={styles.img} src={image} alt="image" />
            </Link>
          </div>
        </div>
        <Link to={`/product/${id}`} className={styles.nameText}>
          {name}
        </Link>
        {fullPrice ? (
          <div className={styles.priceSector}>
            <h3 className={styles.price}>${price}</h3>
            <h3 className={styles.fullPrice}>${fullPrice}</h3>
          </div>
        ) : (
          <h3 className={styles.price}>${price}</h3>
        )}
      </div>
      <div className={styles.bottomSide}>
        <div className={styles.characteristics}>
          <div className={styles.textSection}>
            <p className={styles.smallText}>{t('Screen')}</p>
            <p className={styles.bodyText}>{shortenedScreen}</p>
          </div>
          <div className={styles.textSection}>
            <p className={styles.smallText}>{t('Capacity')}</p>
            <p className={styles.bodyText}>{capacity}</p>
          </div>
          <div className={styles.textSection}>
            <p className={styles.smallText}>{t('RAM')}</p>
            <p className={styles.bodyText}>{ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          {items.some(item => id === item.id) ? (
            <button
              className={classNames(
                styles.add,
                items.some(item => id === item.id) && styles.activeAdd,
              )}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                removeFromCart(id);
              }}
            >
              {t('Added')}
            </button>
          ) : (
            <button
              className={styles.add}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(id);
              }}
            >
              {t('Add')}
            </button>
          )}
          {favouriteItems.some(item => id === item.id) ? (
            <button
              className={classNames(styles.favorite, styles.avtiveFavorite)}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                removeFromFavourites(id);
              }}
            >
              <img
                className={styles.favoriteImage}
                src="img/icons/icon_favorite_active.svg"
                alt=""
              />
            </button>
          ) : (
            <button
              className={styles.favorite}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToFavorites(id);
              }}
            >
              <img
                className={styles.favoriteImage}
                src="img/icons/icon_favorite.svg"
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';
