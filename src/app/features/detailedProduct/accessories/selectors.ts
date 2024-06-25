import { AppState } from '../../../store';

export const selectAccessories = (state: AppState) =>
  state.accessories.accessories;
export const selectAccessoriesInfo = (state: AppState) => state.accessories;
