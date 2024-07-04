import { createContext, useMemo, useState } from 'react';

export const PageContext = createContext<{
  lastPage: string;
  setLastPage: React.Dispatch<React.SetStateAction<string>>;
}>({
  lastPage: 'none',
  setLastPage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [lastPage, setLastPage] = useState<string>('none');

  const value = useMemo(() => ({ lastPage, setLastPage }), [lastPage]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
