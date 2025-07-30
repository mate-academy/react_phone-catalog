import { create } from 'zustand';
import type { Language } from '../../types/language';
import { dictionaries } from '../../dictionaries';

interface TranslationState {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (value: string) => string;
}

const getCurrentLanguage = (): 'EN' | 'UA' => {
  try {
    const language = localStorage.getItem('language');
    return language ? JSON.parse(language) : 'EN';
  } catch {
    return 'EN';
  }
};

export const useTranslationState = create<TranslationState>((set, get) => ({
  language: getCurrentLanguage(),
  setLanguage: (lang) => {
    localStorage.setItem('language', JSON.stringify(lang));
    set({ language: lang });
  },
  translate: (value) => {
    const lang = get().language;
    return dictionaries[lang][value] || value;
  },
}));
