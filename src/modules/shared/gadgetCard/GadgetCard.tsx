import styles from './gadgetCard.module.scss';
import { Product } from '../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setAddToCart,
  setAddToFavourite,
  setDeleteFromFavourite,
} from '../../../features/chosenItemsSlice';
import { useState } from 'react';

type Props = {
  gadget: Product;
};

export const GadgetCard: React.FC<Props> = ({ gadget }) => {
  const [heartIco, setHeartIco] = useState('./icons/heart-ico.svg');
  const [isInCatr, setIsinCart] = useState(false);

  const dispatch = useAppDispatch();

  const favouritesArray = useAppSelector(state => state.chosenItems.favourite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);

  const handleheartIco = () => {
    if (!favouritesArray.some(obj => obj.id === gadget.id)) {
      dispatch(setAddToFavourite(gadget));
      setHeartIco('./icons/heart-red-ico.svg');
    } else {
      dispatch(setDeleteFromFavourite(gadget));
      setHeartIco('./icons/heart-ico.svg');
    }
  };

  const handleAddToCart = () => {
    if (!cartArray.some(obj => obj.id === gadget.id)) {
      dispatch(setAddToCart(gadget));
      setIsinCart(true);
    } else {
      setIsinCart(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__topBlock}>
        <img
          className={styles.card__image}
          src={gadget.image}
          alt="product picture"
        />

        <p className={styles.card__name}>{gadget.name}</p>
      </div>

      <div className={styles.card__bottomBlock}>
        <div className={styles.card__priceBlock}>
          <p className={styles.card__newPrice}>{`$${gadget.price}`}</p>
          <p className={styles.card__oldPrice}>{`$${gadget.fullPrice}`}</p>
        </div>

        <div className={styles.card__divider} />

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Screen</p>
          <p className={styles.card__infoValue}>{gadget.screen}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Capacity</p>
          <p className={styles.card__infoValue}>{gadget.capacity}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>RAM</p>
          <p className={styles.card__infoValue}>{gadget.ram}</p>
        </div>

        <div className={styles.card__buttonsSection}>
          <button
            disabled={isInCatr}
            onClick={handleAddToCart}
            className={`${styles.card__buttonAddToCatr} ${!isInCatr ? styles.add : styles.added}`}
          >
            {isInCatr ? 'In the cart' : 'Add to cart'}
          </button>
          <button
            onClick={handleheartIco}
            className={styles.card__buttonAddToFavourite}
          >
            <img
              className={styles.card__buttonAddFavouriteIcon}
              src={heartIco}
              alt="add to favourites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
