import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CategoryType } from '../modules/shared/types/CategoryType';
//import categoriesFromFile from './api/categories.json';

type CategoryContextType = {
  categories: CategoryType[];
  errorCat: string;
};

// eslint-disable-next-line prettier/prettier
export const CategoryContext = React.createContext<CategoryContextType>({
  categories: [],
  errorCat: '',
});

type Props = {
  children: ReactNode;
};

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [errorCat, setErrorCat] = useState<string>('');

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}api/categories.json`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch categories 1');
      }

      const data: CategoryType[] = await response.json();

      setCategories(data);
    } catch (err) {
      setErrorCat('Failed to fetch categories 2');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = useMemo(
    () => ({
      categories,
      errorCat,
    }),
    [categories, errorCat],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      'useCategoryContext must be used within a CategoryProvider',
    );
  }

  return context;
};
