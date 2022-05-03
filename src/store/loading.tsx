const START = 'loading/START';
const FINISH = 'loading/FINISH';

export const actions = {
  start: () => ({ type: START }),
  finish: () => ({ type: FINISH }),
};

export type loadingActionType = {
  type: string;
};

export const loadingReducer = (state = false, action: loadingActionType) => {
  switch (action.type) {
    case START:
      return true;

    case FINISH:
      return false;

    default:
      return state;
  }
};
