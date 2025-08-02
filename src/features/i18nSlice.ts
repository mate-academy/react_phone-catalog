import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../i18n/i18n';
import { Language } from '../enums/Language';

interface I18nState {
  language: Language;
}

const savedLang =
  (localStorage.getItem('appLanguage') as Language) || Language.EN;

const initialState: I18nState = {
  language: savedLang,
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem('appLanguage', action.payload);
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
