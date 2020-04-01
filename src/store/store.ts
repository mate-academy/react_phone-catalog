import { applyMiddleware, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from './rootReducer';
import { composeEnhancers } from './composeEnhancers';
import { getPhones } from '../utils/api';
import { setPhones, setIsLoading } from './actionCreators';

// thunk
export const loadPhones = () => {
  return async(dispatch: Dispatch) => {
    try {
      setIsLoading(true);
      const phonesQuery = await getPhones();

      dispatch(setPhones(phonesQuery));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
};

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
  reducer,
  initialState,
  enhancer,
);
