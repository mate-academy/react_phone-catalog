import { Product } from '../helpers/types';

const SET = 'goods/SET';

export const actions = {
  set: (goods: Product[]) => ({ type: SET, goods }),
};

export type goodsActionType = {
  type: string;
  goods: Product[];
};

const initialGoods: Product[] = [];

export const goodsReducer = (state: Product[] = initialGoods, action: goodsActionType) => {
  switch (action.type) {
    case SET:
      return action.goods;

    default:
      return state;
  }
};
