import { Action } from 'redux';

const INIT_GOOD = 'INIT_GOOD';
const DELETE_GOOD = 'DELETE_GOOD';

type InitGoodAction = Action<typeof INIT_GOOD> & {
  goods: Good[];
};

type DeleteGoodAction = Action<typeof DELETE_GOOD> & {
  goodId: string;
};

export const initGood = (goods: Good[]): InitGoodAction => ({
  type: INIT_GOOD,
  goods,
});

export const deleteGood = (goodId: string): DeleteGoodAction => ({
  type: DELETE_GOOD,
  goodId,
});

type AlowwedActions = InitGoodAction | DeleteGoodAction;

const goodReducer = (goods: Good[] = [], action: AlowwedActions): Good[] => {
  switch (action.type) {
    case DELETE_GOOD:
      return goods.filter(good => action.goodId !== good.id);
    case INIT_GOOD:
      return action.goods;
    default:
      return goods;
  }
};

export default goodReducer;
