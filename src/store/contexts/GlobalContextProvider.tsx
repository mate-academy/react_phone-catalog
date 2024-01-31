import { ErrorProvider } from "./ErrorContext";
import { SearchProvider } from "./SearchContext";

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </ErrorProvider>
  );
};