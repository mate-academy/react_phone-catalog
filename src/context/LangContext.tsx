import { createContext, ReactNode, useState } from 'react';
import { Lang } from '../types/enumLang';

export const LangContext = createContext<{
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
}>({
  lang: Lang.EN,
  setLang: () => {},
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(Lang.EN);

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
