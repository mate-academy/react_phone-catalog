import React from 'react';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductType } from 'models/product.model';
import { useProducts } from 'src/context/ProductsContext';

const favoriteIcons = '/img/icons/';

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, favorites, toggleCart, toggleFav } = useProducts();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleCart(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFav(product);
  };

  const isAdded = cart.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

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
