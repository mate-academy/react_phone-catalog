import { AnyAction } from 'redux';
import { type } from '../actions';

const catalogState: CatalogState = {
  phones: [],
};

export const catalogReducer = (
  state = catalogState, action: AnyAction,
): CatalogState => {
  switch (action.type) {
    case type.SET_PHONES:
      return {
        phones: action.phones,
      };

    default:
      return state;
  }
};
