import { Action } from 'redux';

const SET_GOODS = 'SET_GOODS';

type SetGoods = Action<typeof SET_GOODS> & { goods: Good[] };

export const setGoods = (goods: Good[]): SetGoods => ( {type:  SET_GOODS, goods} );

const goodsReducer = (state = [], action: SetGoods) => {
  switch (action.type) {
    case SET_GOODS:
      return action.goods;

    default:
      return state;
  }
}

export default goodsReducer;
