import React, { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Params } from '../types/Params';

type SortContextType = {
  getSearchWith: (params: Params, search?: URLSearchParams | string) => string;
  setSearchWith: (
    params: Params,
    prevParams?: URLSearchParams | string,
  ) => void;
};

export const SortContext = createContext<SortContextType>({
  getSearchWith: () => '',
  setSearchWith: () => {},
});

export const SortProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchWith = (params: Params, search?: URLSearchParams | string) => {
    const newSearchParams = new URLSearchParams(search);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value.toString());
      }
    }

    return newSearchParams.toString();
  };

  const setSearchWith = (
    params: Params,
    prevParams?: URLSearchParams | string,
  ) => {
    const search = getSearchWith(params, prevParams);

    setSearchParams(search);
  };

  return (
    <SortContext.Provider value={{ getSearchWith, setSearchWith }}>
      {children}
    </SortContext.Provider>
  );
};
