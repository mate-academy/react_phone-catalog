import { SearchProvider } from './SearchContext';

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SearchProvider>
      {children}
    </SearchProvider>
  );
};
