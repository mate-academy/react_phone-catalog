import { Dispatch } from 'redux';
import { setCurrentProduct } from '../../features/chosenItemsSlice';
import { Product } from '../../types/Product';
import { scrollPageUp } from './scrollPageUp';

export const handleClickOnGadget = (item: Product, dispatch: Dispatch) => {
  scrollPageUp();

  dispatch(setCurrentProduct(item));

  localStorage.setItem('currentProduct', JSON.stringify(item));
};
