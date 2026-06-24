import { FC, ReactNode, useState } from 'react';
import { IntlProvider } from 'use-intl';
import { LanguageContext } from '../contexts/LanguageContext';
import enMessages from '../../../i18n/messages/en.json';
import ukMessages from '../../../i18n/messages/uk.json';

const messages: Record<string, typeof enMessages> = {
  en: enMessages,
  uk: ukMessages,
};

const SUPPORTED = ['en', 'uk'];

function getInitialLocale(): string {
  const saved = localStorage.getItem('language');

  return saved && SUPPORTED.includes(saved) ? saved : 'en';
}

interface Props {
  children: ReactNode;
}

export const LanguageProvider: FC<Props> = ({ children }) => {
  const [locale, setLocaleState] = useState(getInitialLocale);

  const setLocale = (lang: string) => {
    const safe = SUPPORTED.includes(lang) ? lang : 'en';

    localStorage.setItem('language', safe);
    setLocaleState(safe);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
