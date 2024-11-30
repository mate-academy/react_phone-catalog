import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../features/cartItems';
import { RootState } from '../app/store';
import { Product } from '../types/product';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartItems.items);

  const isInCart = (id: number) => cartItems.some(item => item.id === id);

  const handleCartAction = (itemData: Product) => {
    if (isInCart(itemData.id)) {
      dispatch(removeItemFromCart(itemData.id));
    } else {
      dispatch(addItemToCart(itemData));
    }
  };

  return { handleCartAction, isInCart };
};
