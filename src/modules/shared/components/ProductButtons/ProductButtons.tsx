import { FC } from 'react';
import s from './ProductButtons.module.scss';
import { useFavouriteContext } from '../../../../context/FavoritesContext';
import { useCartContext } from '../../../../context/CartContext';

interface Props {
  itemId: string;
}

export const ProductButtons: FC<Props> = ({ itemId }) => {
  const { isFavorite, toggle } = useFavouriteContext();
  const { isInCart, addToCart } = useCartContext();

  const inFav = isFavorite(itemId);
  const inCart = isInCart(itemId);

  const handleAdd = () => {
    if (inCart) {
      return;
    }

    addToCart(itemId);
  };

  return (
    <div className={s.productButtons}>
      <button
        className={inCart ? `${s.addToCart} ${s.inCart}` : `${s.addToCart}`}
        type="button"
        onClick={handleAdd}
      >
        {inCart ? 'Added to cart' : 'Add to Cart'}
      </button>
      <button
        className={inFav ? `${s.addToFav} ${s.inFav}` : `${s.addToFav}`}
        type="button"
        onClick={() => toggle(itemId)}
      />
    </div>
  );
};
