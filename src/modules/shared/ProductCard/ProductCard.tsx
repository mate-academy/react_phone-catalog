// тут треба погратись з імпортами в цій структурі
import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router';
import { ProductType } from 'models/product.model';

const favoriteIcons = '/img/icons/';

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const [isAdded, setIsAdded] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const CART_KEY = `cart:${product.id}`;
  const FAV_KEY = `fav:${product.id}`;

  const [isAdded, setIsAdded] = useState(() => {
    return localStorage.getItem(CART_KEY) === 'true';
  });

  const [isFavorite, setIsFavorite] = useState(() => {
    return localStorage.getItem(FAV_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, String(isAdded));
  }, [isAdded, CART_KEY]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, String(isFavorite));
  }, [isFavorite, FAV_KEY]);

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    setIsAdded(prev => !prev);
  };

  const handleAddToFavorites = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  };

  return (
    <>
      <div
        className={styles.productcard}
        onClick={() => navigate(`/${product.category}/product/${product.id}`)}
      >
        <img className={styles.productcard__img} src={product.image} alt="" />
        <h3 className={styles.productcard__title}>{product.name}</h3>
        <div className={styles.productcard__price}>
          <h2 className={styles.productcard__price_disconout}>
            ${product.price}
          </h2>
          <h2 className={styles.productcard__price_full}>
            ${product.fullPrice}
          </h2>
        </div>
        <div className={styles.productcard__info}>
          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>Screen</span>
            <span className={styles.productcard__info_value}>
              {product.screen}
            </span>
          </div>

          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>Capacity</span>
            <span className={styles.productcard__info_value}>
              {product.capacity}
            </span>
          </div>

          <div className={styles.productcard__info_row}>
            <span className={styles.productcard__info_label}>RAM</span>
            <span className={styles.productcard__info_value}>
              {product.ram}
            </span>
          </div>
        </div>
        <div className={styles.productcard__buttons}>
          <button
            className={`${styles.productcard__buttons_cart} ${
              isAdded ? styles['productcard__buttons_cart_is-active'] : ''
            }`}
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className={`${styles.productcard__buttons_like} ${isFavorite ? styles['productcard__buttons_like_is-active'] : ''}`}
            onClick={handleAddToFavorites}
          >
            {isFavorite ? (
              <img
                src={favoriteIcons + 'icon-favourites-heart-like-filled.png'}
                alt=""
                className={styles.productcard__buttons_like__img}
              />
            ) : (
              <img
                src={favoriteIcons + 'icon-favourites-heart-like.png'}
                alt=""
                className={styles.productcard__buttons_like__img}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
