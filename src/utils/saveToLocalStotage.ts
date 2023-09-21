import { CartItemType } from '../types/CartItemType';
import { Product } from '../types/Product';

export const saveToLocalStotage = (
  data: Product[] | CartItemType[], LOCAL_STORAGE_KEY: string,
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
