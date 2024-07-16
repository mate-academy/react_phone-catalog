import React, { createContext } from 'react';
import { useLocalStorage } from '../../../Hooks/useLocalStorage';

export const GlobalContext = createContext<GlobalContextType>({
  isSunSelected: true, // Початкове значення
  setIsSunSelected: () => {}, // Пуста функція-заглушка
});

type GlobalContextType = {
  isSunSelected: boolean;
  setIsSunSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [isSunSelected, setIsSunSelected] = useLocalStorage<boolean>(
    'theme',
    true,
  ); // Використовуємо кастомний локал сторидж

  return (
    <GlobalContext.Provider value={{ isSunSelected, setIsSunSelected }}>
      {children}
    </GlobalContext.Provider>
  );
};
