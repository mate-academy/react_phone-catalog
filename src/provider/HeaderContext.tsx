import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface HeaderContextType {
  inputValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }

  return context;
};

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <HeaderContext.Provider value={{ inputValue, handleSearch }}>
      {children}
    </HeaderContext.Provider>
  );
};
