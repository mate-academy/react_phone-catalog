import { Item } from '../types/Item';
import { ItemDetails } from '../types/ItemDetails';
import { get } from '../api/items';

export const getAllProducts = () => {
  return get<Item[]>('products.json');
};

export const getProductById = (id: string) => {
  return get<ItemDetails>(`products/${id}.json`);
};
