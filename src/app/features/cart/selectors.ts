/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppState } from '../../store';

export const selectInCart = (state: AppState) => state.inCart;
export const selectNumberOfItemsInCart = (state: AppState): number =>
  Object.entries(state.inCart).reduce(
    (total, [_id, count]) => total + Number(Boolean(count)),
    0,
  );
