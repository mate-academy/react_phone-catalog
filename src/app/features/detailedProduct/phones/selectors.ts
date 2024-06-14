import { AppState } from '../../../store';

export const selectPhones = (state: AppState) => state.phones.phones;
export const selectPhonesInfo = (state: AppState) => state.phones;
