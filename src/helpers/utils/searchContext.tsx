import React, { ReactNode, useState } from 'react';

type ContextValue = {
  canSearch: boolean;
  setCanSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = React.createContext<ContextValue>({
  canSearch: true,
  setCanSearch: () => {},
});

type Props = {
  children: ReactNode;
};

export const SearchContextProvider: React.FC<Props> = ({ children }) => {
  const [canSearch, setCanSearch] = useState(true);

  const value = { canSearch, setCanSearch };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
