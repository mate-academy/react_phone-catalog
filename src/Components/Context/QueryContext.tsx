import React, { useMemo, useState } from 'react';

type QueryContextType = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
};

type Props = {
  children: React.ReactNode,
};

export const QueryContext = React.createContext<QueryContextType>({
  query: '',
  setQuery: () => {},
});

export const QueryContextProvider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState<string>('');

  const contextValue = useMemo(() => {
    return {
      query,
      setQuery,
    };
  }, [query]);

  return (
    <QueryContext.Provider value={contextValue}>
      {children}
    </QueryContext.Provider>
  );
};
