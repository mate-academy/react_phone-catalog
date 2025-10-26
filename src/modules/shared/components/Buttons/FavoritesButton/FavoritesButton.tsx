/* eslint-disable max-len */
import styles from '../Button.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { ProductData } from '../../../types/ProductData';
import { selectFromFavorites, toggleFavorite } from '../../../../../store/slices/favoritesSlice';

type Props = {
  product: ProductData;
};

export const FavoritesButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const itemIdsInFavorites = useAppSelector(selectFromFavorites);

  const inFavorites = itemIdsInFavorites.includes(product.itemId);

  return (
    <button
      className={`${inFavorites ? styles.favorite__button__active : styles.favorite__button}`}
      onClick={() => {
        dispatch(toggleFavorite(product));
      }}
    ></button>
  );
};
