import { State } from '../context/ContextReducer';

export const filterStateForLocalStorage = (state: State) => {
  const { allPrices, totalCartItem, ...filteredState } = state;

  return filteredState;
};
