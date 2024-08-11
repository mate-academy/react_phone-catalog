import { Product } from '../../../types';
import { useAppDispatch } from '../../hooks';
import {
  increase,
  decrease,
  deleteProduct,
  addProduct,
  clearCart,
} from './cartSlice';

type Payload = Pick<Product, 'itemId'>;

export const useCart = () => {
  const dispatch = useAppDispatch();

  return {
    addOne: (payload: Payload) => dispatch(increase(payload)),
    removeOne: (payload: Payload) => dispatch(decrease(payload)),
    removeFromCart: (payload: Payload) => dispatch(deleteProduct(payload)),
    addToCart: (payload: Payload) => dispatch(addProduct(payload)),
    clearCart: () => dispatch(clearCart()),
  };
};
