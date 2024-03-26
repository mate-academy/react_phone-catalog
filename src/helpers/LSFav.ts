import { Product } from '../types/Product';

const addToLSFav = (el: Product) => {
  let fav: Product[] = [];
  const favLS = localStorage.getItem('fav');

  if (favLS !== null) {
    fav = JSON.parse(favLS);
  }

  const existingItemIndex = fav.findIndex((item: Product) => item.id === el.id);

  let newFav = [...fav];

  if (existingItemIndex === -1) {
    newFav.push(el);
  } else {
    newFav = fav.filter(x => x.id !== el.id);
  }

  localStorage.setItem('fav', JSON.stringify(newFav));
};

const checkLSFav = (productId: string) => {
  let fav: Product[] = [];
  const favLS = localStorage.getItem('fav');

  if (favLS !== null) {
    fav = JSON.parse(favLS);
  }

  const existingItemIndex = fav.findIndex(item => item.id === productId);

  return existingItemIndex !== -1;
};

const getTotalFavQuantity = () => {
  let cart: Product[] = [];
  const stringLS = localStorage.getItem('fav');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  return cart.length;
};

export const LSFav = {
  addToLSFav,
  checkLSFav,
  getTotalFavQuantity,
};
