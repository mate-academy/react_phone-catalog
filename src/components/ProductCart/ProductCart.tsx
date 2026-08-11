import { Product } from '../../types/product';
import { CartItem } from '../../types/cartItem';
import { AddToFavorites } from '../../utils/AddToFavorite';
import { AddToCart } from '../../utils/AddToCart';
import heartIcon from '../../../public/img/icons/Favourites (Heart Like).png';
import heartIconFilled from '../../../public/img/icons/heartIconFilled.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProductCart.module.scss';

type Props = {
  product: Product;
  isDiscounted: boolean;
  onToggleFavorite?: (product: Product) => void;
  onToggleCart?: (product: Product) => void;
};

export const ProductCart = ({
  product,
  isDiscounted,
  onToggleFavorite,
  onToggleCart,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    const incart = localStorage.getItem('cart');

    if (stored) {
      const favorites: Product[] = JSON.parse(stored);
      const exists = favorites.some(p => p.id === product.id);

      setIsActive(exists);
    }

    if (incart) {
      const cart: CartItem[] = JSON.parse(incart);
      const existsInCart = cart.some(
        (item: CartItem) => item.product.id === product.id,
      );

      setInCart(existsInCart);
    }
  }, [product.id]);

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product);

      return;
    }

    const result = AddToFavorites(product);

    setIsActive(result.isActive);
  };

  const handleToggleCart = () => {
    if (onToggleCart) {
      onToggleCart(product);

      return;
    }

    const result = AddToCart(product);

    setInCart(result.inCart);
  };

  return (
    <div className={styles.productCart}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCart__imageContainer}
      >
        <img
          className={styles.productCart__img}
          src={product.image}
          alt="product image"
        />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCart__name}
      >
        {product.name}
      </Link>

      {isDiscounted ? (
        <div className={styles.productCart__price}>
          <span className={styles.productCart__priceCurrent}>
            ${product.price}
          </span>
          <span className={styles.productCart__priceFull}>
            ${product.fullPrice}
          </span>
        </div>
      ) : (
        <div className={styles.productCart__price}>
          <span className={styles.productCart__priceCurrent}>
            ${product.price}
          </span>
        </div>
      )}

      <span className={styles.productCart__separator}></span>

      <div className={styles.productCart__specs}>
        <div className={styles.productCart__spec}>
          <span className={styles.productCart__specTitle}>Screen</span>
          <span className={styles.productCart__specValue}>
            {product.screen}
          </span>
        </div>
        <div className={styles.productCart__spec}>
          <span className={styles.productCart__specTitle}>Capacity</span>
          <span className={styles.productCart__specValue}>
            {product.capacity}
          </span>
        </div>
        <div className={styles.productCart__spec}>
          <span className={styles.productCart__specTitle}>RAM</span>
          <span className={styles.productCart__specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.productCart__actions}>
        <button
          onClick={handleToggleCart}
          className={
            inCart
              ? `${styles.productCart__button} ${styles.productCart__buttonCart}`
              : `${styles.productCart__button} ${styles.productCart__buttonAdd}`
          }
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          onClick={handleToggleFavorite}
          className={`${styles.productCart__button} ${styles.productCart__buttonLike}`}
        >
          {isActive ? (
            <img
              src={heartIconFilled}
              alt="heart"
              className={styles.productCart__buttonHeartIcon}
            />
          ) : (
            <img
              src={heartIcon}
              alt="heart"
              className={styles.productCart__buttonHeartIcon}
            />
          )}
        </button>
      </div>
    </div>
  );
};
