import { Link } from 'react-router-dom';
import styles from './ProductCardSale.module.scss';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../types';

type Props = {
  product: Product;
};

export const ProductCardSale = ({ product }: Props) => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('ProductCardSale must be used inside FavoritesProvider');
  }

  const { favourites, addFavourite, removeFavourite } = context;

  const contextCart = useContext(CartContext);

  if (!contextCart) {
    throw new Error('ProductCardSale must be used inside CartProvider');
  }

  const { cartItems, addProduct } = contextCart;

  const isFavourite = favourites.some(favourite => favourite.id === product.id);
  const isInCart = cartItems.some(cart => cart.id === product.id);

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <img
          src={`${product.images[0]}`}
          alt={product.name}
          className={styles.card__photo}
        />
        <div className={styles.card__info}>
          <h3 className={styles.card__title}>{product.name}</h3>
          <div className={styles.price}>
            <p className={styles.card__price}>${product.priceRegular}</p>
            <p className={styles.card__price__sale}>${product.priceDiscount}</p>
          </div>
        </div>
        <div className={styles.card__detailInfo}>
          <div className={styles.card__detailInfoItem}>
            <p className={styles.name}>Screen</p>
            <p className={styles.detail}>{product.screen}</p>
          </div>
          <div className={styles.card__detailInfoItem}>
            <p className={styles.name}>Capacity</p>
            <p className={styles.detail}>{product.capacity}</p>
          </div>
          <div className={styles.card__detailInfoItem}>
            <p className={styles.name}>RAM</p>
            <p className={styles.detail}>{product.ram}</p>
          </div>
        </div>
      </Link>
      <div className={styles.card__buttons}>
        <button
          className={`${styles.add} ${isInCart ? styles['add--active'] : ''}`}
          onClick={() => {
            if (!isInCart) {
              addProduct(product);
            }
          }}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`${styles.favourite} ${
            isFavourite ? styles['favourite--active'] : ''
          }`}
          onClick={() => {
            if (isFavourite) {
              removeFavourite(product.id);
            } else {
              addFavourite(product);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.favourite__icon}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5
             5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
