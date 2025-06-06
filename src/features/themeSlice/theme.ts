import { createSlice } from '@reduxjs/toolkit';
import { appLocaleStorage } from '../../utils/localeStorageClient';
import { ColorTheme } from '../../types/ColorTheme';

const storage = appLocaleStorage('theme');

const getTheme = (): ColorTheme => {
  const theme = storage.getData();

  if (!theme || !Object.values(ColorTheme).includes(theme)) {
    storage.setData(ColorTheme.light);

    return ColorTheme.light;
  }

  return theme;
};

const initialState: ColorTheme = getTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: s => {
      switch (s) {
        case ColorTheme.dark:
          storage.setData(ColorTheme.light);

          return ColorTheme.light;

        case ColorTheme.light:
          storage.setData(ColorTheme.dark);

          return ColorTheme.dark;

        default:
          storage.setData(ColorTheme.light);

          return ColorTheme.light;
      }
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
