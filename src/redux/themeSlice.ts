import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type ThemeType = 'theme0' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

interface ThemeState {
  currentTheme: ThemeType;
  loadedStyles: Record<string, boolean>;
  loadingStyles: Record<string, boolean>; // loadingProgress
}

const initialState: ThemeState = {
  currentTheme: 'theme0',
  loadedStyles: {},
  loadingStyles: {},
};

export const loadComponentStyles = createAsyncThunk(
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
);

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
      // Можна додати логіку для скидання стану завантажених стилів при зміні теми
      state.loadedStyles = {};
      localStorage.setItem('website-theme', action.payload);
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
export default themeSlice.reducer;
