import { createContext } from 'react';

export const LanguageContext = createContext({});

type Props = {
  children: React.ReactNode;
};

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const value = {};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
