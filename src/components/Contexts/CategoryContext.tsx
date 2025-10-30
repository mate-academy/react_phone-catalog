import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type CategoryContextType = {
  categories: string[];
  currentCategory: string | null;
};

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  currentCategory: null,
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pathname } = useLocation();

  const categories = ['phones', 'tablets', 'accessories', 'favourites', 'cart'];

  const currentCategory = useMemo(() => {
    return categories.find(category => pathname.includes(category)) || null;
  }, [pathname]);

  const value = {
    categories,
    currentCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within CategoryProvider');
  }
  return context;
};
