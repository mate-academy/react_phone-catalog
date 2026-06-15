/* eslint-disable padding-line-between-statements */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ProductType, ProductDetailsType, CategoryType } from '../types';

interface ProductsContextType {
  // Сирі дані та прапорці стану
  products: ProductType[];
  productsDetails: ProductDetailsType[];
  categoryCount: Record<CategoryType, number>;
  isLoading: boolean;
  isError: boolean;

  // Функція для отримання відфільтрованих базових товарів
  // (для сторінок категорій Phones/Tablets)
  getProductsByCategory: (category: CategoryType) => ProductType[];

  // Асинхронна функція для довантаження детальних файлів
  // (phones.json / tablets.json / accessories.json)
  loadCategoryDetails: (category: CategoryType) => Promise<void>;

  // Функція для миттєвого пошуку детального товару в глобальному стейті
  // (для сторінки деталей конкретного товару)
  getProductDetailById: (productId: string) => ProductDetailsType | undefined;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = (
  { children }: { children: React.ReactNode }
) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsDetails, setProductsDetails] = useState<ProductDetailsType[]>([]);
  const [loadedCategories, setLoadedCategories] = useState<CategoryType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch('/api/products.json');

        if (!response.ok) {
          throw new Error('Помилка завантаження products.json');
        }

        const data = await response.json();

        //*! ШТУЧНЕ УПОВІЛЬНЕННЯ ЗАВАНТАЖЕННЯ ДАНИХ,ЩОБ ПОКАЗАТИ <Skeleton /> *//
        await new Promise(resolve => setTimeout(resolve, 2000));
        //*! МОЖНА ВИДАЛИТИ *//

        setProducts(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const categoryCount = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    products.forEach(product => {
      const category = product.category as CategoryType;

      if (category in counts) {
        counts[category] += 1;
      }
    });

    return counts;
  }, [products]);

  function getProductsByCategory(category: CategoryType): ProductType[] {
    return [...products].filter(prod => prod.category === category);
  }

  async function loadCategoryDetails(category: CategoryType): Promise<void> {
    if (loadedCategories.includes(category)) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`/api/${category}.json`);

      if (!response.ok) {
        throw new Error(`Помилка завантаження ${category}.json`);
      }

      const data = await response.json();

      //*! ШТУЧНЕ УПОВІЛЬНЕННЯ ЗАВАНТАЖЕННЯ ДАНИХ,ЩОБ ПОКАЗАТИ <Skeleton /> *//
      await new Promise(resolve => setTimeout(resolve, 2000));
      //*! МОЖНА ВИДАЛИТИ *//

      setProductsDetails(prev => [...prev, ...data]);
      setLoadedCategories(prev => [...prev, category]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function getProductDetailById(productId: string): ProductDetailsType | undefined {
    return productsDetails.find(product => product.id === productId);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsDetails,
        categoryCount,
        isLoading,
        isError,
        getProductsByCategory,
        loadCategoryDetails,
        getProductDetailById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
