import {
  Reducer,
  createStore,
  applyMiddleware,
  Dispatch,
  Action,
} from 'redux';
import thunk from 'redux-thunk';

import { getPhones, getDetails } from '../api/api';

import { PHONES_URL, LOAD_PHONES } from '../utils/constants';

const initialState: State = {
  phones: [],
};

interface CustomAction extends Action {
  type: string;
  payload: PhonesWithDetails[];
}

export const setPhones = (payload: PhonesWithDetails[]) => ({
  type: LOAD_PHONES,
  payload,
});

export const loadPhones = () => {
  return async(dispatch: Dispatch) => {
    const phones = await getPhones<Phone[]>(PHONES_URL);
    const details = await getDetails<Details[]>(phones);
    const phonesWithDetails = phones.map(phone => ({
      ...phone,
      details: details.find(detail => phone.id === detail.id) as Details,
    }));

    dispatch(setPhones(phonesWithDetails));
  };
};

const phonesReducer: Reducer<State, CustomAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_PHONES:
      return {
        ...state,
        phones: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(
  phonesReducer,
  initialState,
  applyMiddleware(thunk),
);
