import { Action } from 'redux';

const INIT_GOOD = 'INIT_GOOD';

type InitGoodAction = Action<typeof INIT_GOOD> & {
  goods: Good[];
};

export const initGood = (goods: Good[]): InitGoodAction => ({
  type: INIT_GOOD,
  goods,
});

type AlowwedActions = InitGoodAction;

const goodReducer = (goods: Good[] = [], action: AlowwedActions): Good[] => {
  switch (action.type) {
    case INIT_GOOD:
      return action.goods;
    default:
      return goods;
  }
};

export default goodReducer;
