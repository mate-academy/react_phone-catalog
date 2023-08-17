import { Product } from '../types/Product';

const catalog: Product[] = JSON.parse(
  localStorage.getItem('fullList') || '',
);

export const selectedList: Product[] = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList') || '')
  : [];

const findItem = (list: Product[], id: string) => {
  return list.filter(item => item.id === id).length;
};

export const cartListAdded = (cartId: string) => {
  const newItem = catalog.find(item => item.id === cartId);

  if (newItem) {
    selectedList.push(newItem);
  }

  localStorage.setItem('cartList', JSON.stringify(selectedList));
};

export const checkIsSelected = (id: string) => {
  return !!findItem(selectedList, id);
};
