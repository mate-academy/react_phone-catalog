import { useAppDispatch, useAppSelector } from '../../app/hook';
import { addToCart, deleteFromCart } from '../../features/cartSlice';
import { addToFav, deleteFromFav } from '../../features/favSlice';
import { icons } from '../../shared/global/Icons';
import { ProductInfo } from '../../types/ProductInfo';
import { AccentBtn } from '../AccentBtn';

import styles from './ActionBlock.module.scss';

type Props = {
  product: ProductInfo;
  customHeight?: number;
  paddingFav?: number;
};

export const ActionBlock: React.FC<Props> = ({
  product,
  customHeight,
  paddingFav,
}) => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItem } = useAppSelector(state => state.cartItems);

  const hasFav = favourites.some(fav => fav.id === product.id);
  const hasCart = cartItem.some(item => item.id === product.id);

  const handleFavs = () => {
    if (!hasFav) {
      dispatch(addToFav(product));
    } else {
      dispatch(deleteFromFav(product.id));
    }
  };

  const handleToCart = () => {
    if (!hasCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(deleteFromCart(product.id));
    }
  };

  return (
    <div
      className={styles.actionBlock}
      style={{ height: customHeight ? `${customHeight}px` : 'auto' }}
    >
      <AccentBtn
        text={!hasCart ? 'Add to cart' : 'Added'}
        onClick={handleToCart}
        hasCart={hasCart}
      />

      <button
        type="button"
        style={{ padding: `${paddingFav}px` }}
        className={styles.arrowBtnFav}
        onClick={handleFavs}
      >
        {!hasFav ? icons.favourites : icons.favActive}
      </button>
    </div>
  );
};
