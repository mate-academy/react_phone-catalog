/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme');
const initialState = {
  currentTheme: ['theme0', 'theme1', 'theme2', 'theme3', 'theme4']
    .includes(savedTheme)
    ? savedTheme
    : 'theme0',
};

/* export const loadComponentStyles = createAsyncThunk(
  'theme/loadComponentStyles',
  async ({ componentName, theme }: { componentName: string; theme: ThemeType },
    { rejectWithValue }) => {
    try {
      await import(`../components/${componentName}/${componentName}_${theme}.scss`);
      console.log(`завантажено стиль для ${componentName}, тема ${theme}:`); // remove this for prod

      return { componentName, theme };
    } catch (error) {
      console.error(`Помилка завантаження стилів для ${componentName}, тема ${theme}:`, error); // remove this for prod

      return rejectWithValue({ componentName, theme, error });
    }
  },
); */

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.current = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
/*   extraReducers: (builder) => {
    builder
      .addCase(loadComponentStyles.pending, (state, action) => {
        const { componentName, theme } = action.meta.arg;
        const key = `${componentName}_${theme}`;
        state.loadingStyles[key] = true;
      })
      .addCase(loadComponentStyles.fulfilled, (state, action) => {
        const { componentName, theme } = action.payload;
        const key = `${componentName}_${theme}`;
        state.loadingStyles[key] = false;
        state.loadedStyles[key] = true;
      })
      .addCase(loadComponentStyles.rejected, (state, action) => {
        if (action.meta && action.meta.arg) {
          const { componentName, theme } = action.meta.arg;
          const key = `${componentName}_${theme}`;
          state.loadingStyles[key] = false;
        }
      });
  }, */
});

export const { setTheme } = themeSlice.actions;
export const currentTheme = (state) => state.theme.current;
export default themeSlice.reducer;
