import { FC } from 'react';
import s from './ProductButtons.module.scss';
import { useFavouriteContext } from '../../../../context/FavoritesContext';

interface Props {
  itemId: string;
}

export const ProductButtons: FC<Props> = ({ itemId }) => {
  const { isFavorite, toggle } = useFavouriteContext();

  const inFav = isFavorite(itemId);

  return (
    <div className={s.productButtons}>
      <button className={s.addToCart} type="button">
        Add to Cart
      </button>
      <button
        className={inFav ? `${s.addToFav} ${s.inFav}` : `${s.addToFav}`}
        type="button"
        onClick={() => toggle(itemId)}
      />
    </div>
  );
};
