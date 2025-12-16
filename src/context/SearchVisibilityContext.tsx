// src/context/SearchVisibilityContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SearchVisibilityContextValue = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

const SearchVisibilityContext = createContext<
  SearchVisibilityContextValue | undefined
>(undefined);

export const SearchVisibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <SearchVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </SearchVisibilityContext.Provider>
  );
};

export const useSearchVisibility = (): SearchVisibilityContextValue => {
  const ctx = useContext(SearchVisibilityContext);

  if (!ctx) {
    throw new Error(
      'useSearchVisibility must be used within SearchVisibilityProvider',
    );
  }

  return ctx;
};
