import { Product } from '../../../types';
import { useAppDispatch } from '../../hooks';
import { toggleItem, addItem, removeItem } from './favouritesSlice';

type Payload = Pick<Product, 'itemId'>;

export const useFavourites = () => {
  const dispatch = useAppDispatch();

  return {
    toggle: (payload: Payload) => dispatch(toggleItem(payload)),
    add: (payload: Payload) => dispatch(addItem(payload)),
    remove: (payload: Payload) => dispatch(removeItem(payload)),
  };
};
