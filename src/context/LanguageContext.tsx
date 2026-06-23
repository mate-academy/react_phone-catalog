import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Locale, TRANSLATIONS, TranslationKey } from '../i18n/translations';

interface LanguageState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageState | null>(null);

const detect = (): Locale => {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (lang === 'ru') return 'ru';
  if (lang === 'uk') return 'uk';
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setStored] = useLocalStorage<Locale>('locale', detect());

  const setLocale = useCallback((l: Locale) => setStored(l), [setStored]);

  const t = useCallback(
    (key: TranslationKey) => {
      const dict = TRANSLATIONS[locale];
      return dict[key] ?? TRANSLATIONS.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<LanguageState>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
};

export const useT = () => useLanguage().t;
