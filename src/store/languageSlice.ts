import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Language } from '../types/language';

const LANGUAGE_STORAGE_KEY = 'language';

type LanguageState = {
  current: Language;
};

const getSavedLanguage = (): Language => {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (savedLanguage === 'ua' || savedLanguage === 'en') {
    return savedLanguage;
  }

  return 'en';
};

const initialState: LanguageState = {
  current: getSavedLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (_state, action: PayloadAction<Language>) => {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, action.payload);

      return {
        current: action.payload,
      };
    },

    toggleLanguage: state => {
      const nextLanguage = state.current === 'en' ? 'ua' : 'en';

      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

      return {
        current: nextLanguage,
      };
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
