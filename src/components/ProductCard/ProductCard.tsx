import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useShopContext } from '../../context/ShopContext';
import styles from './ProductCard.module.scss';
import React from 'react';

export interface Product {
  price: number;
  id: string;
  category: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  ram: string;
  images: string[];
  year?: number;
}

interface Props {
  product: Product;
}

const FAVORITE_PATH =
  'M14.6667 4.79336C14.6667 7.0267 11.96 9.87336 8 ' +
  '13.3334C4.04 9.87336 1.33333 7.0267 1.33333 4.79336C1.33333 ' +
  '2.92003 2.80667 1.44003 4.66667 1.44003C5.74667 1.44003 ' +
  '6.78667 1.95336 7.42667 2.7667L8 3.47336L8.57333 ' +
  '2.7667C9.21333 1.95336 10.2533 1.44003 11.3333 1.44003C13.1933 ' +
  '1.44003 14.6667 2.92003 14.6667 4.79336Z';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems, favorites, addToCart, toggleFavorite } = useShopContext();

  const {
    id,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    images,
    category = 'phones',
  } = product;

  const image = images && images.length > 0 ? images[0] : '';
  const isAdded = cartItems.some(item => item.id === id);
  const isFavorite = favorites.some(item => item.id === id);
  const productLink = `/${category}/${id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdded) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <article className={styles.card}>
      <Link to={productLink} className={styles.imageContainer}>
        {/* Убрали жесткий слеш `/${image}`, теперь путь относительный */}
        <img src={image} alt={name} />
      </Link>

      <Link to={productLink} className={styles.title}>
        {name}
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${priceDiscount}</span>
        {priceRegular !== priceDiscount && (
          <span className={styles.fullPrice}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={cn(styles.addToCart, {
            [styles.added]: isAdded,
          })}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={cn(styles.favoriteBtn, {
            [styles.isFavorite]: isFavorite,
          })}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="var(--c-red)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={FAVORITE_PATH}
                stroke="var(--c-red)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={FAVORITE_PATH}
                stroke="var(--c-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
};
