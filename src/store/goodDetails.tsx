import { ProductDetailsType } from '../helpers/types';

const SET = 'goodsDetails/SET';

export const actions = {
  set: (goodDetails: ProductDetailsType) => ({ type: SET, goodDetails }),
};

export type goodDetailsActionType = {
  type: string;
  goodDetails: ProductDetailsType;
};

const initialGoods: {} | ProductDetailsType = {};

export const goodDetailsReducer = (
  state = initialGoods as ProductDetailsType,
  action: goodDetailsActionType,
) => {
  switch (action.type) {
    case SET:
      return action.goodDetails;

    default:
      return state;
  }
};
// import { ProductDetailsType } from '../helpers/types';

// const SET = 'goodsDetails/SET';

// export const actions = {
//   set: (goodDetails: ProductDetailsType) => ({ type: SET, goodDetails }),
// };

// export type goodDetailsActionType = {
//   type: string;
//   goodDetails: ProductDetailsType;
// };

// const initialGoods: {} | ProductDetailsType = {};

// export const goodDetailsReducer = (
//   state: ProductDetailsType | any = initialGoods,
//   action: goodDetailsActionType,
// ) => {
//   switch (action.type) {
//     case SET:
//       return action.goodDetails;

//     default:
//       return state;
//   }
// };
