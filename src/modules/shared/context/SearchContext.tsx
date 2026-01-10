import { createContext, useContext, useEffect, useState } from 'react';

export interface SearchConfig {
  visible: boolean;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

interface SearchContextValue {
  config: SearchConfig;
  setSearchConfig: (config: SearchConfig) => void;
}

const hiddenConfig: SearchConfig = {
  visible: false,
  value: '',
  onChange: () => {},
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [config, setConfig] = useState<SearchConfig>(hiddenConfig);

  const setSearchConfig = (nextConfig: SearchConfig) => setConfig(nextConfig);

  return (
    <SearchContext.Provider value={{ config, setSearchConfig }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }

  return context;
};

export const useSearchConfig = (config: SearchConfig) => {
  const { setSearchConfig } = useSearch();

  useEffect(() => {
    setSearchConfig(config);

    return () => {
      setSearchConfig(hiddenConfig);
    };
  }, [config, setSearchConfig]);
};
