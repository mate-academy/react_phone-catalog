import { applyMiddleware, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from './rootReducer';
import { composeEnhancers } from './composeEnhancers';
import { getPhones, getDataById, getDetails } from '../utils/api';
import {
  setPhones,
  setIsLoadingPhones,
  setQuery,
  setIsLoadingDetails,
  setDetails,
} from './actionCreators';

// thunk
export const loadPhones = () => {
  return async(dispatch: Dispatch) => {
    try {
      dispatch(setIsLoadingPhones(true));
      const phonesQuery = await getPhones();

      dispatch(setPhones(phonesQuery));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      dispatch(setIsLoadingPhones(false));
      dispatch(setQuery(''));
    }
  };
};

export const loadDetails = (id: string) => {
  return async(dispatch: Dispatch) => {
    try {
      dispatch(setIsLoadingDetails(true));

      const url = getDataById(id);
      const phoneDetails = await getDetails(url);

      dispatch(setDetails(phoneDetails));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      dispatch(setIsLoadingDetails(false));
    }
  };
};

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
  reducer,
  initialState,
  enhancer,
);
