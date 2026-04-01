import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n/i18n';

interface LangState {
  lang: string;
  setLang: (lang: string) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    set => ({
      lang: i18n.language || 'ua',
      setLang: newLang => {
        i18n.changeLanguage(newLang);
        set({ lang: newLang });
      },
    }),
    { name: 'lang-storage' },
  ),
);
