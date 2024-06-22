import { useSelector } from 'react-redux';

import { Product } from '../../../types';
import { AppState } from '../../store';
import { useAppDispatch } from '../../hooks';
import { increase, decrease, deleteProduct, addProduct } from './cartSlice';

type Payload = Pick<Product, 'itemId'>;

export const useCart = <T>(selector: (state: AppState) => T) => {
  const data = useSelector(selector);
  const dispatch = useAppDispatch();

  return [
    data,
    {
      addOne: (payload: Payload) => dispatch(increase(payload)),
      removeOne: (payload: Payload) => dispatch(decrease(payload)),
      removeFromCart: (payload: Payload) => dispatch(deleteProduct(payload)),
      addToCart: (payload: Payload) => dispatch(addProduct(payload)),
    },
  ] as const;
};
