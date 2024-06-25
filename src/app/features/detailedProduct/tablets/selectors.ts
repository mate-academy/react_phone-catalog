import { AppState } from '../../../store';

export const selectTablets = (state: AppState) => state.tablets.tablets;
export const selectTabletsInfo = (state: AppState) => state.tablets;
