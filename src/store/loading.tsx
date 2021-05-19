const START = 'loading/START';
const FINISH = 'loading/FINISH';

export const actions = {
  start: () => ({ type: START }),
  finish: () => ({ type: FINISH }),
};

export type loadingActionType = {
  type: string;
};

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action: loadingActionType) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isLoading: true,
      };

    case FINISH:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
