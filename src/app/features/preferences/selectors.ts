import { AppState } from '../../store';

export const selectIsThemeDark = (state: AppState) =>
  state.preferences.isThemeDark;
