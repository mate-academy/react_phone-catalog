import styles from './ProductCard.module.scss';

import { Link } from 'react-router-dom';
import { useContext } from 'react';


import { ProductCardData } from '../../types/ProductCardData';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { CartContext } from '../../../context/CartContext';


type Props = {
  product: ProductCardData;
  isShowDiscount: boolean;
};
export const ProductCard: React.FC<Props> = ({ product, isShowDiscount }) => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!cartContext) {
    return null;
  }

  const { cart, setCart } = cartContext;
  const isExistInCart = cart.some(
    item => item.product.itemId === product.itemId,
  );
  const handleAddToCart = () => {
    if (!product || isExistInCart) {
      return;
    }

    setCart(prev => [
      ...prev,
      {
        product: product,
        amount: 1,
      },
    ]);
  };

  if (!favoritesContext) {
    return null;
  }

  const { favorites, setFavorites } = favoritesContext;
  const isFavorite = favorites.some(item => item.itemId === product.itemId);
  const handleAddToFavorites = () => {
    if (isFavorite) {
      setFavorites(prev => prev.filter(item => item.itemId !== product.itemId));
    } else {
      setFavorites(prev => [...prev, product]);
    }
  };

  return (
    <div className={styles['product-card']}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles['product-card__link']}
      >
        <div className={styles['product-card__image-container']}>
          <img
            className={styles['product-card__image']}
            src={`${import.meta.env.BASE_URL}/${product.image}`}
            alt={product.name}
          />
        </div>
        <h3 className={styles['product-card__title']}>{product.name}</h3>
      </Link>

      {isShowDiscount ? (
        <p className={styles['product-card__price']}>
          {`$${product.price}`}{' '}
          <span
            className={styles['product-card__price--full']}
          >{`$${product.fullPrice}`}</span>
        </p>
      ) : (
        <p className={styles['product-card__price']}>{`$${product.price}`}</p>
      )}
      <ul className={styles['product-card__specs']}>
        <li className={styles.spec}>
          <span className={styles.spec__name}>Screen</span>
          <span className={styles.spec__value}>{product.screen}</span>
        </li>

        <li className={styles.spec}>
          <span className={styles.spec__name}>Capacity</span>
          <span className={styles.spec__value}>{product.capacity}</span>
        </li>

        <li className={styles.spec}>
          <span className={styles.spec__name}>RAM</span>
          <span className={styles.spec__value}>{product.ram}</span>
        </li>
      </ul>

      <div className={styles['product-card__buttons']}>
        <button
          className={styles['product-card__add']}
          onClick={handleAddToCart}
          disabled={isExistInCart}
        >
          {isExistInCart ? 'Added to cart' : 'Add to card'}
        </button>
        <button
          className={styles['product-card__favourite']}
          onClick={handleAddToFavorites}
        >
          <img
            src={
              isFavorite
                ? `${import.meta.env.BASE_URL}/img/buttons/heart-filled.svg`
                : `${import.meta.env.BASE_URL}/img/buttons/heart.svg`
            }

             alt="button-favorite"
          />
        </button>
      </div>
    </div>
  );
};
