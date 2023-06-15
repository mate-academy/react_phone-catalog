import { createContext, useState } from 'react';

type SerchContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext
  = createContext<SerchContextType>({} as SerchContextType);

type Props = {
  children: React.ReactNode,
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};
