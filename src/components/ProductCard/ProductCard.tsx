import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import image from '../../../public/icons/Add to fovourites - Default.svg';
import favImage from '../../../public/icons/Favourites-Filled-(Heart-Like).svg';
import { useCart } from '../../context/CartContext';
import { getImgUrl } from '../../utils/getImgUrl';

type Product = {
  id: string | number;
  name: string;
  images?: string[];
  capacity?: string;
  colorsAvailable?: string[];
  priceRegular?: number;
  priceDiscount?: number;
  screen: string;
  ram: string;
};

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addToCart, removeFromCart, addToFavourites, favourites, cartItems } =
    useCart();

  const thumb =
    product.images && product.images.length
      ? getImgUrl(product.images[0])
      : getImgUrl('img/placeholder.png');

  const hasDiscount =
    product.priceDiscount && product.priceDiscount < product.priceRegular;

  const isFavourite = favourites.some(item => item.id === product.id);
  const isAddedToCart = cartItems.some(item => item.id === product.id);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.thumbLink}>
        <img src={thumb} alt={product.name} className={styles.image} />
      </Link>

      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.name}
        </Link>

        <div className={styles.meta}>
          <div className={styles.price}>
            {hasDiscount ? (
              <>
                <span className={styles.discount}>
                  ${product.priceDiscount}
                </span>
                <span className={styles.regular}>${product.priceRegular}</span>
              </>
            ) : (
              <span className={styles.discount}>${product.priceRegular}</span>
            )}
          </div>
        </div>

        <div className={styles.borderBottom}></div>

        <div className={styles.productInfo}>
          <div className={styles.characteristics}>
            <span className={styles.characteristics__name}>Screen</span>
            <span>{product.screen.split(' ').slice(0, 2).join(' ')}</span>
          </div>
          <div className={styles.characteristics}>
            <span className={styles.characteristics__name}>Capacity</span>
            <span>{product.capacity}</span>
          </div>
          <div className={styles.characteristics}>
            <span className={styles.characteristics__name}>RAM</span>
            <span>{product.ram}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={isAddedToCart ? styles.addedToCart : styles.addToCart}
            onClick={e => {
              isAddedToCart ? removeFromCart(product.id) : addToCart(product);

              e.currentTarget.blur();
            }}
          >
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            className={styles.addToFavourites}
            onClick={e => {
              addToFavourites(product);

              e.currentTarget.blur();
            }}
          >
            <img
              className={
                isFavourite ? styles.favImageActive : styles.favImageDefault
              }
              src={isFavourite ? favImage : image}
              alt="fav"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
