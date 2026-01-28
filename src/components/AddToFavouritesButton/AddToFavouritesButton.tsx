import styles from './AddToFavouritesButton.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import { favouritesSlice } from '../../features/favourites';
import heart from '/img/favourites-heart.svg';
import filledHeart from '/img/favourites-heart-filled.svg';

type Props = {
  product: Product;
};

export const AddToFavouritesButton: React.FC<Props> = ({ product }) => {
  const { items } = useAppSelector(state => state.favourites);

  const dispatch = useAppDispatch();

  const isInFavourites = items.some(item => item.itemId === product.itemId);

  const handleProductAdd = () => {
    dispatch(favouritesSlice.actions.addProduct(product));
  };

  const handleProductRemove = (id: string) => {
    dispatch(favouritesSlice.actions.removeProduct({ id }));
  };

  return (
    <button
      type="button"
      className={styles.add_to_fav_button}
      onClick={() =>
        isInFavourites
          ? handleProductRemove(product.itemId)
          : handleProductAdd()
      }
    >
      {isInFavourites ? (
        <img src={filledHeart} alt="filled heart" className={styles.heart} />
      ) : (
        <img src={heart} alt="heart" className={styles.heart} />
      )}
    </button>
  );
};
