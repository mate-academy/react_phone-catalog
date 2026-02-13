import { useLocation } from 'react-router-dom';
import { createContext } from 'react';

type CategoryContextType = {
  categories: string[];
  currentCategory: string | undefined;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  currentCategory: '',
});

type Props = {
  children: React.ReactNode;
};

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const categories = ['phones', 'tablets', 'accessories', 'favorites', 'cart'];
  const currentCategory = categories.find(found => pathname.includes(found));

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
