import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { favouritesIcon } from '../../assets/icons';
import redIcon from '../../../public/img/icons/red.png';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';

interface ProductCardProps {
  product: Product;
  isHomePahe?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHomePahe = false,
}) => {
  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const productId = product.itemId || product.id;
  const isInCart = cart.some(item => item.id === productId);
  const productImage = product.image || product.images[0];
  const productPrise = product.price || product.priceDiscount;
  const productAdditionalPrice = product.priceRegular
    ? `$${product.priceRegular}`
    : '';

  return (
    <div
      className={`${styles.productCard} ${isHomePahe ? styles.homePageCard : ''}`}
    >
      <Link to={`/product/${product.category}/${productId}`}>
        <img
          src={`./${productImage}`}
          alt={product.name}
          className={styles.productCard__image}
        />
      </Link>
      <Link to={`/product/${productId}`} className={styles.productCard__link}>
        <h3 className={styles.productCard__title}>{product.name}</h3>
      </Link>
      <div className={`${styles.productCard__price} ${styles.productPrice}`}>
        <span className={styles.productPrice__current}>${productPrise}</span>
        <span className={styles.productPrice__old}>
          {productAdditionalPrice}
        </span>
      </div>
      <div className={styles.productCard__specs}>
        <div className={styles.productCard__details}>
          <span className={styles.productCard__property}>Screen:</span>
          <span className={styles.productCard__value}>{product.screen}</span>
        </div>
        <div className={styles.productCard__details}>
          <span className={styles.productCard__property}>Capacity</span>
          <span className={styles.productCard__value}>{product.capacity}</span>
        </div>
        <div className={styles.productCard__details}>
          <span className={styles.productCard__property}>RAM</span>
          <span className={styles.productCard__value}>{product.ram}</span>
        </div>
      </div>
      <div className={styles.productCard__actions}>
        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={styles.productCard__button}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <img
          onClick={() => toggleFavorite(product)}
          src={isFavorite(product.id) ? redIcon : favouritesIcon}
          alt="Favourites"
          className={`${styles.productCard__icon} `}
        />
      </div>
    </div>
  );
};
