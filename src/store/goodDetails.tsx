import { ProductDetailsType } from '../helpers/types';

const SET = 'goodsDetails/SET';

export const actions = {
  set: (goodDetails: ProductDetailsType) => ({ type: SET, goodDetails }),
};

export type goodDetailsActionType = {
  type: string;
  goodDetails: ProductDetailsType;
};

export const goodDetailsReducer = (state = {}, action: goodDetailsActionType) => {
  switch (action.type) {
    case SET:
      return action.goodDetails;

    default:
      return state;
  }
};
