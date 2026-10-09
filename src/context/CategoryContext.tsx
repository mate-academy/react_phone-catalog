import React, { createContext, useContext, useState } from 'react';

type CategoryContextType = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
};

const CategoryContext = createContext<CategoryContextType>({
  activeCategory: null,
  setActiveCategory: () => {},
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
