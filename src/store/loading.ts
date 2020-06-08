import { Action } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

type startLoadingAction = Action<typeof START_LOADING>;
type fihishLoadingAction = Action<typeof FINISH_LOADING>;

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

type AllowedActions = startLoadingAction | fihishLoadingAction;

const loadingReducer = (loading = false, action: AllowedActions): boolean => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return loading;
  }
};

export default loadingReducer;
