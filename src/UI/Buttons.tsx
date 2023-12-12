import { FC } from 'react';
import { FavoritesIcon } from '../icons/FavoritesIcon';
import styles from './Buttons.module.scss';
import { FavouritesIconRed } from '../icons/FavouritesIconRed';

type Props = {
  handleAddPhoneToCart: () => void,
  handleAddToMyFavourites: () => void,
  selected: boolean,
};

export const Buttons: FC<Props> = ({
  handleAddPhoneToCart,
  handleAddToMyFavourites,
  selected,
}) => {
  console.log(selected);

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={styles.buttons__add}
        onClick={handleAddPhoneToCart}
      >
        Add to cart
      </button>
      <button
        type="button"
        className={styles.buttons__favorites}
        onClick={handleAddToMyFavourites}
      >
        {!selected ? <FavoritesIcon /> : <FavouritesIconRed />}
      </button>
    </div>
  );
};
