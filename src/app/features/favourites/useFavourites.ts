import { useSelector } from 'react-redux';

import { toggleItem, addItem, removeItem } from './favouritesSlice';
import { Product } from '../../../types';
import { useAppDispatch } from '../../hooks';
import { AppState } from '../../store';

type Payload = Pick<Product, 'itemId'>;

export const useFavourites = <T>(selector: (state: AppState) => T) => {
  const data = useSelector(selector);
  const dispatch = useAppDispatch();

  return [
    data,
    {
      toggle: (payload: Payload) => dispatch(toggleItem(payload)),
      add: (payload: Payload) => dispatch(addItem(payload)),
      remove: (payload: Payload) => dispatch(removeItem(payload)),
    },
  ] as const;
};
