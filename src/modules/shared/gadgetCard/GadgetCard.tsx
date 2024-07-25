import styles from './gadgetCard.module.scss';
import { Product } from '../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setAddToCart,
  setAddToFavourite,
  setDeleteFromFavourite,
} from '../../../features/chosenItemsSlice';

type Props = {
  gadget: Product;
};

export const GadgetCard: React.FC<Props> = ({ gadget }) => {
  const dispatch = useAppDispatch();

  const favouritesArray = useAppSelector(state => state.chosenItems.favourite);
  const cartMap = useAppSelector(state => state.chosenItems.cart);

  const favouriteIco = favouritesArray.some(obj => obj.id === gadget.id)
    ? './icons/heart-red-ico.svg'
    : './icons/heart-ico.svg';

  function handleheartIco() {
    if (!favouritesArray.some(obj => obj.id === gadget.id)) {
      dispatch(setAddToFavourite(gadget));
    } else {
      dispatch(setDeleteFromFavourite(gadget));
    }
  }

  function handleAddToCart() {
    if (!cartMap.some(obj => obj.id === gadget.id)) {
      dispatch(setAddToCart(gadget));
    }
  }

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
        <p className={styles.card__price}>{`$${gadget.price}`}</p>

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
            onClick={() => handleAddToCart()}
            className={styles.card__buttonAddToCatr}
          >
            Add to cart
          </button>
          <button
            onClick={() => handleheartIco()}
            className={styles.card__buttonAddToFavourite}
          >
            <img
              className={styles.card__buttonAddFavouriteIcon}
              src={favouriteIco}
              alt="add to favourites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
