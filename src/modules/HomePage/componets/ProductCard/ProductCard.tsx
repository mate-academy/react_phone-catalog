import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../contexts/CartContext';
import {
  useFavorites,
  FavoriteItem,
} from '../../../../contexts/FavoritesContext';
import styles from './ProductCard.module.scss';
import favIcon from '/icons/fav-icon.png';
import favActIcon from '/icons/favorite-active-icon.png';

type Props = {
  product: FavoriteItem;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const hasDiscount = product.fullPrice > product.price;

  const { cart, addToCart, removeFromCart, createCartItemId } = useCart();
  const cartItemId = createCartItemId(product);
  const inCart = cart.some(item => item.cartItemId === cartItemId);

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(product);

  const imgUrl =
    'https://annaabramovaa.github.io/react_phone-catalog/' + product.image;

  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{
            category: product.category,
            name: product.name,
            showDiscount,
            color: product.color,
            capacity: product.capacity,
          }}
          className={styles.card_link}
        >
          <div className={styles.card_image}>
            <img src={imgUrl} alt={product.name} />
          </div>
          <h3 className={styles.card__title}>{product.name}</h3>
          <div className={styles.card__prices}>
            <span className={styles.card__price}>${product.price}</span>
            {showDiscount && hasDiscount && (
              <span className={styles.card__fullPrice}>
                ${product.fullPrice}
              </span>
            )}
          </div>
          <div className={styles.divide_line}></div>
          <div className={styles.card__specs}>
            <dl>
              <dt>Screen</dt>
              <dd>{product.screen}</dd>
              <dt>Capacity</dt>
              <dd>{product.capacity}</dd>
              <dt>RAM</dt>
              <dd>{product.ram}</dd>
            </dl>
          </div>
        </Link>

        <div className={styles.card__actions}>
          <button
            type="button"
            className={`${styles.card__addBtn} ${inCart ? styles.card__btn__disabled : ''}`}
            onClick={() => {
              if (inCart) {
                removeFromCart(cartItemId);
              } else {
                addToCart(product);
              }
            }}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={`${styles.card__favBtn} ${isFav ? styles['card__favBtn--active'] : ''}`}
            onClick={() => toggleFavorite(product, showDiscount)}
          >
            <img
              src={isFav ? favActIcon : favIcon}
              alt={isFav ? 'Added to favorites' : 'Add to favorites'}
              className={styles.card__favBtn__img}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
