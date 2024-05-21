import styles from './ShopCard.module.scss';
import heart from './../../images/icons/heart.svg';
import fillHeart from './../../images/icons/heart_filled.svg';
import React from 'react';
import { Product } from '../../utils/types/Product';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlise';

type Props = {
  product: Product;
  isDiscount: boolean;
};

export const ShopCard: React.FC<Props> = ({ product, isDiscount }) => {
  const { image, name, price, fullPrice, screen, capacity, ram, id, itemId } =
    product;

  const dispatch = useAppDispatch();

  const favoritesItems = useAppSelector(state => state.favorites);

  const cartItems = useAppSelector(state => state.cart.items);

  const isFavorite = favoritesItems.find(item => item.id === id);

  const isAdded = cartItems.find(item => item.id === id);

  return (
    <article className={styles.card}>
      <div className={styles.card__wrapper}>
        <Link to={itemId} className={styles.card__wrapper}>
          <div className={styles.card__image}>
            <img
              // eslint-disable-next-line max-len
              src={image}
              alt="Card Image"
              className={styles.card__picture}
            />
          </div>
          <p className={styles.card__description}>{name}</p>
          <div className={styles.card__priceBox}>
            <h3 className={styles.card__original_price}>{price}$</h3>
            {isDiscount && (
              <h3 className={styles.card__sale_price}>{fullPrice}$</h3>
            )}
          </div>
          <div className={styles.card__line}></div>
        </Link>
        <div className={styles.card__details}>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>Screen</p>
            <p className={styles.card__detailsInfo_characteristic}>{screen}</p>
          </div>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>Capacity</p>
            <p className={styles.card__detailsInfo_characteristic}>
              {capacity}
            </p>
          </div>
          <div className={styles.card__detailsInfo}>
            <p className={styles.card__detailsInfo_name}>RAM</p>
            <p className={styles.card__detailsInfo_characteristic}>{ram}</p>
          </div>
        </div>
        <div className={styles.card__buttons}>
          {isAdded ? (
            <div className={styles.card__success_added}>Added</div>
          ) : (
            <button
              className={styles.card__buttons_card}
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
          )}

          <button
            className={styles.card__buttons_like}
            onClick={() => dispatch(toggleFavorite(product))}
          >
            {isFavorite ? (
              <img src={fillHeart} alt="Red heart" />
            ) : (
              <img src={heart} alt="Heart" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
