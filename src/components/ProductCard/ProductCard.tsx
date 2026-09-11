import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './ProductCard.module.scss';

import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error('ProductCard must be used inside FavoritesProvider');
  }

  const { favourites, addFavourite, removeFavourite } = favoritesContext;

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('ProductCard must be used inside CartProvider');
  }

  const { cartItems, addProduct } = cartContext;

  const fullProduct = [...phones, ...tablets, ...accessories].find(
    item => item.id === product.itemId,
  );

  const isFavourite = favourites.some(
    favourite => favourite.id === product.itemId,
  );

  const isInCart = cartItems.some(cart => cart.id === product.itemId);

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.cardLink}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__photo}
        />

        <div className={styles.card__info}>
          <h3 className={styles.card__title}>{product.name}</h3>

          <div className={styles.price}>
            <p className={styles.card__price}>${product.price}</p>

            {product.fullPrice !== product.price && (
              <p className={styles.card__price__sale}>${product.fullPrice}</p>
            )}
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
            if (fullProduct && !isInCart) {
              addProduct(fullProduct);
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
              removeFavourite(product.itemId);
            } else if (fullProduct) {
              addFavourite(fullProduct);
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
