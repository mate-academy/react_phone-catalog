import * as cartActions from './cartSlice';
import * as favouritesActions from './favouritesSlice';

export const rootActions = {
  ...cartActions,
  ...favouritesActions,
};
