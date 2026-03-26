import { useState } from 'react';
import { Product } from '../ProductCarousel';

import Favourite from '../../assets/Icons/Favourites.svg';
import FavouriteFilled from '../../assets/Icons/Favourites_filled.svg';
// Стилі підтягуються з модульного файлу каруселі
import styles from '../ProductCarousel/ProductCarousel.module.scss';

type Props = {
  product: Product;
  discount?: boolean;
};

const HeartIcon = ({ filled }: { filled: boolean }) =>
  // <svg
  //   width="18"
  //   height="18"
  //   viewBox="0 0 24 24"
  //   fill={filled ? '#e53e3e' : 'none'}
  //   stroke={filled ? '#e53e3e' : '#999'}
  //   strokeWidth="2"
  // >
  //   {/* <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /> */}
  // </svg>
  filled ? (
    <img src={FavouriteFilled} alt="favorite_filled_icon" />
  ) : (
    <img src={Favourite} alt="favorite_icon" />
  );

export const ProductCard = ({ product, discount }: Props) => {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  // ✅ УНІВЕРСАЛЬНА ЛОГІКА (ФОЛБЕКИ)
  // Якщо є масив images - беремо першу картинку з нього. Якщо ні - беремо старе поле image.
  const displayImage = product.images?.[0] || product.image;

  // Якщо є priceDiscount - беремо його, якщо ні - беремо price.
  const currentPrice = product.priceDiscount || product.price;

  // Те ж саме для повної ціни
  const oldPrice = product.priceRegular || product.fullPrice;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={styles['product-card']}>
      <div className={styles['card-image-wrap']}>
        {/* Використовуємо нашу універсальну змінну для картинки */}
        <img
          src={displayImage}
          alt={`${product.name} ${product.color}`}
          className={styles['card-image']}
          onError={e => {
            (e.target as HTMLImageElement).setAttribute(
              'src',
              'https://via.placeholder.com/200x240/f0f0f0/999?text=iPhone',
            );
          }}
        />
      </div>
      <div className={styles['card-body']}>
        <h3 className={styles['card-title']}>{product.name}</h3>

        {/* Використовуємо наші універсальні змінні для цін */}
        <p className={styles['card-price']}>
          ${currentPrice}
          {discount && oldPrice && (
            <span className={styles['card-discount']}>${oldPrice}</span>
          )}
        </p>

        <div className={styles['card-specs']}>
          <div className={styles['spec-row']}>
            <span className={styles['spec-label']}>Screen</span>
            <span className={styles['spec-value']}>{product.screen}</span>
          </div>
          <div className={styles['spec-row']}>
            <span className={styles['spec-label']}>Capacity</span>
            <span className={styles['spec-value']}>{product.capacity}</span>
          </div>
          <div className={styles['spec-row']}>
            <span className={styles['spec-label']}>RAM</span>
            <span className={styles['spec-value']}>{product.ram}</span>
          </div>
        </div>

        <div className={styles['card-actions']}>
          <button
            className={`${styles['btn-add']} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : 'Add to cart'}
          </button>

          <button
            className={`${styles['btn-like']} ${liked ? styles.liked : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <HeartIcon filled={liked} />
          </button>
        </div>
      </div>
    </div>
  );
};
