import { Product } from '../helpers/types';

const ADD = 'goods/ADD';
const REMOVE = 'goods/REMOVE';
const INCREASE = 'goods/INCREASE';
const DECREASE = 'goods/DECREASE';

export const actions = {
  add: (good: Product) => ({ type: ADD, good }),
  remove: (good: Product) => ({ type: REMOVE, good }),
  increase: (good: Product) => ({ type: INCREASE, good }),
  decrease: (good: Product) => ({ type: DECREASE, good }),
};

type Action = {
  type: string;
  good: Product;
};

const initialGoods: Product[] = localStorage.getItem('cartGoods') === null
  ? []
  : JSON.parse(localStorage.getItem('cartGoods') || '');

export const cartReducer = (goods: Product[] = initialGoods, action: Action) => {
  let cartGoods: Product[] = [];

  switch (action.type) {
    case ADD:
      cartGoods = [...goods, { ...action.good, quantity: 1 }];
      break;
    case REMOVE:
      cartGoods = goods.filter((good: Product) => good.id !== action.good.id);
      break;
    case INCREASE:
      cartGoods = goods.map((good: Product) => ({
        ...good,
        quantity: good.id === action.good.id
          ? good.quantity + 1
          : good.quantity,
      }));
      break;
    case DECREASE:
      cartGoods = goods.map((good: Product) => ({
        ...good,
        quantity: good.id === action.good.id
          ? good.quantity - 1
          : good.quantity,
      }));
      break;

    default:
      return goods;
  }

  localStorage.setItem('cartGoods', JSON.stringify(cartGoods));

  return cartGoods;
};
