import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Category } from '../../../types/Category';

interface ActiveCategoryContextType {
  activeCategory: Category | null;
  setActiveCategory: (category: Category | null) => void;
}

type ContextValue = ActiveCategoryContextType | undefined;

// lets the product page highlight its category in the header navigation
const ActiveCategoryContext = createContext<ContextValue>(undefined);

export const ActiveCategoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const value = useMemo(
    () => ({ activeCategory, setActiveCategory }),
    [activeCategory],
  );

  return (
    <ActiveCategoryContext.Provider value={value}>
      {children}
    </ActiveCategoryContext.Provider>
  );
};

export const useActiveCategory = () => {
  const context = useContext(ActiveCategoryContext);

  if (!context) {
    throw new Error(
      'useActiveCategory must be used within ActiveCategoryProvider',
    );
  }

  return context;
};
