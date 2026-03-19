import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../CartPage/features/cartSlice';
import { cartSelectors } from '../../CartPage/selectors/cartSelectors';
import type { AppDispatch, RootState } from '../../../store';
import type { Product } from '../../../types';

export const useCart = (product: Product) => {
  const dispatch = useDispatch<AppDispatch>();
  const isInCart = useSelector((state: RootState) =>
    cartSelectors.selectIsInCart(state, product.itemId),
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(cartActions.addToCart(product));
    }
  };

  return { isInCart, handleAddToCart };
};
