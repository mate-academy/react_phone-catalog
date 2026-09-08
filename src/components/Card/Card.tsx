import styles from './Card.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { addItemToCart } from '../../slices/cartSlice';
import { useEffect, useState } from 'react';
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from '../../slices/favoritesSlice';
import { TransitionLink } from '../TransitionLink';

interface Props {
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  hasDiscount?: boolean;
  itemId: string;
  category: string;
  id: string;
}

export const Card: React.FC<Props> = ({
  name,
  image,
  capacity,
  price,
  fullPrice,
  screen,
  ram,
  hasDiscount,
  itemId,
  category,
  id,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorites.items) || [];
  const isFavorited = favorites.some(item => item.id === id);

  const cartItems = useAppSelector(state => state.cart.items) || [];
  const isInCart = cartItems.some(item => item.id === id);

  useEffect(() => {
    setIsClicked(isInCart);
  }, [isInCart]);

  const addToCartHandler = () => {
    const product = {
      id,
      name,
      price,
      image,
      itemId,
      category,
    };

    dispatch(addItemToCart({ item: product }));
    setIsClicked(true);
  };

  const toggleFavoritesHandler = () => {
    const product = {
      id,
      name,
      price,
      fullPrice,
      image,
      itemId,
      category,
      ram,
      screen,
      capacity,
    };

    if (isFavorited) {
      dispatch(removeItemFromFavorites(id));
    } else {
      dispatch(addItemToFavorites({ item: product }));
    }
  };

  return (
    <div className={styles.card}>
      <TransitionLink
        to={`/${category}/${itemId}`}
        className={styles.cardImage}
      >
        <img className={styles.image} src={image} alt={name} />
      </TransitionLink>
      <TransitionLink
        to={`/${category}/${itemId}`}
        className={styles.cardTitle}
      >
        <h3 className={styles.title}>{name}</h3>
      </TransitionLink>

      <h3 className={styles.price}>
        ${price}
        {hasDiscount && <span className={styles.fullPrice}>${fullPrice}</span>}
      </h3>

      <div className={styles.specifications}>
        <div className={styles.row}>
          <p className={styles.specification}>Screen</p>
          <p className={styles.value}>{screen}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.specification}>Capacity</p>
          <p className={styles.value}>{capacity}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.specification}>RAM</p>
          <p className={styles.value}>{ram}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={addToCartHandler}
          className={`${styles.addToCartButton} ${isClicked && styles.addedToCart}`}
        >
          {isClicked ? 'Added' : 'Add to cart'}
        </button>

        <button
          onClick={toggleFavoritesHandler}
          className={`${styles.heartIcon} ${isFavorited ? styles.favoritedButton : ''}`}
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M11.3 0.298782C10.7264 0.298782 10.1584 0.411797 9.62852 0.631371C9.09865 0.850924 8.61711 1.17283 8.21162 1.57847L8.00005 1.79005L7.78835 1.57836C6.96928 0.759288 5.85839 0.299139 4.70005 0.299139C3.54171 0.299139 2.43081 0.759288 1.61174 1.57836C0.792668 2.39743 0.33252 3.50833 0.33252 4.66667C0.33252 5.82501 0.792668 6.9359 1.61174 7.75497L7.50507 13.6483C7.77844 13.9217 8.22165 13.9217 8.49502 13.6483L14.3884 7.75497C14.794 7.34949 15.1158 6.86806 15.3353 6.33819C15.5549 5.80827 15.6679 5.24028 15.6679 4.66667C15.6679 4.09305 15.5549 3.52506 15.3353 2.99514C15.1158 2.46532 14.7941 1.98394 14.3885 1.57847C13.983 1.17277 13.5015 0.850945 12.9716 0.631371C12.4416 0.411797 11.8737 0.298782 11.3 0.298782Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
