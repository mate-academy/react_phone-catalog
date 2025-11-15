import React, { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ParamsMap } from '../types/ParamsMap';

type SortContextType = {
  getSearchWith: (
    params: ParamsMap,
    search?: URLSearchParams | string,
  ) => string;
  setSearchWith: (
    params: ParamsMap,
    prevParams?: URLSearchParams | string,
  ) => void;
};

export const SortContext = createContext<SortContextType>({
  getSearchWith: () => '',
  setSearchWith: () => {},
});

export const SortProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchWith = (
    params: ParamsMap,
    search?: URLSearchParams | string,
  ) => {
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
    params: ParamsMap,
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
