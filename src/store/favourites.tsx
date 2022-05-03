import { Product } from '../helpers/types';

const ADD = 'favourites/ADD';
const REMOVE = 'favourites/REMOVE';

export const actions = {
  add: (good: Product) => ({ type: ADD, good }),
  remove: (good: Product) => ({ type: REMOVE, good }),
};

type Action = {
  type: string;
  good: Product;
};

const initialGoods: Product[] = localStorage.getItem('favouritesGoods') === null
  ? []
  : JSON.parse(localStorage.getItem('favouritesGoods') || '');

export const favouritesReducer = (goods: Product[] = initialGoods, action: Action) => {
  let cartGoods: Product[] = [];

  switch (action.type) {
    case ADD:
      cartGoods = [...goods, { ...action.good, quantity: 1 }];
      break;
    case REMOVE:
      cartGoods = goods.filter((good: Product) => good.id !== action.good.id);
      break;

    default:
      return goods;
  }

  localStorage.setItem('favouritesGoods', JSON.stringify(cartGoods));

  return cartGoods;
};
