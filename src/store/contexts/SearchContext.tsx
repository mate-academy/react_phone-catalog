import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchVisible: false,
  setSearchVisible: (() => { }) as React.Dispatch<React.SetStateAction<boolean>>
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <SearchContext.Provider value={{searchVisible, setSearchVisible}}>
      {children}
    </SearchContext.Provider>
  );
};
