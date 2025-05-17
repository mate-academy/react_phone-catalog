import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAllProducts } from '../services/products';
import { Category } from '../types/Category';
import {
  categoryBannerMap,
  categoryDescriptionMap,
  categoryImageMap,
} from '../helpers/categoriesHelper';
import { useError } from './ErrorContext';
import { useLoading } from './LoadingContext';
import { fallbackCategories } from '../constants/categories';

type CategoriesContextType = {
  categories: Category[];
};

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});

type Props = {
  children: ReactNode;
};

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { addError: setError } = useError();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(productsFromServer =>
        setCategories(
          productsFromServer.reduce<Category[]>((acc, product) => {
            const { category } = product;
            const existingCategory = acc.find(item => item.name === category);

            if (existingCategory) {
              existingCategory.modelsCount += 1;
            } else {
              acc.push({
                name: category,
                banner: categoryBannerMap[category],
                image: categoryImageMap[category],
                modelsCount: 1,
                description: categoryDescriptionMap[category],
              });
            }

            return acc;
          }, []),
        ),
      )
      .catch(() => {
        setError('Failed to load categories. Using default categories.');
        setCategories(fallbackCategories);
      })
      .finally(() => stopLoading());
  }, [setError, startLoading, stopLoading]);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
};
