import { ReactNode, useContext, useState, createContext } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface NavigationContextType {
  history: string[];
  push: (p: string) => void;
  goBack: (navigate: NavigateFunction, fallback: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);

  const push = (path: string) => {
    setHistory(prev => [...prev, path]);
  };

  const goBack = (navigate: NavigateFunction, fallback: string = '/') => {
    setHistory(prev => {
      if (prev.length === 0) {
        navigate(fallback);

        return [];
      }

      const newHistory = [...prev];

      newHistory.pop();
      const last = newHistory.pop() || fallback;

      navigate(last);

      return newHistory;
    });
  };

  return (
    <NavigationContext.Provider value={{ history, push, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }

  return context;
};
