import { useState, type ReactNode } from 'react';
import { LanguageContext, type Language } from './LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('appLanguage') as Language;

    // Перевіряємо, чи збережена мова є валідною
    if (savedLanguage === 'ua' || savedLanguage === 'en') {
      return savedLanguage;
    }
    return 'en'; // За замовчуванням 'en'
    // return savedLanguage && (savedLanguage === 'ua' || savedLanguage === 'en')
    //   ? savedLanguage
    //   : 'en';
  });

  // Функція для зміни мови та збереження її в localStorage
  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const contextValue = {
    currentLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
