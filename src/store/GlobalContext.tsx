import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { ShoppingCartProduct } from '../types/ShoppingCartProduct';
import { SpecificProduct } from '../types/SpecificProduct';

// Универсальная функция для запроса
async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json(); // Возможная ошибка от сервера

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json();
}

// Функция для получения всех продуктов
export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}

// Функция для получения продуктов по типу
export function getSpecificProducts(
  productsType: string,
): Promise<SpecificProduct[]> {
  return fetchProducts<SpecificProduct[]>(`./api/${productsType}.json`);
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key "${key}": ${error}`);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`Error saving to localStorage key "${key}": ${error}`);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

type GlobalContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  shoppingCart: ShoppingCartProduct[];
  setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCartProduct[]>>;
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearShoppingCart: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [] as Product[],
  setProducts: () => {},
  sortBy: 'Newest',
  setSortBy: () => {},
  shoppingCart: [] as ShoppingCartProduct[],
  setShoppingCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  updateQuantity: () => {},
  clearShoppingCart: () => {},
  query: '',
  setQuery: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingCart, setShoppingCart] = useLocalStorage<
  ShoppingCartProduct[]
  >('shoppingCart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        const updatedProducts = fetchedProducts.map(product => ({
          ...product,
          shoppingCart: false,
          favourite: false,
        }));

        setProducts(updatedProducts);
      } catch (error) {
        throw new Error(
          `Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    };

    fetchAllProducts();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setProducts(prevProducts =>
  //       sortProducts(prevProducts, { sortBy, query }),
  //     );
  //   }, 1000);

  //   return () => clearTimeout(timer); // Очистка предыдущего таймера
  // }, [query, sortBy]);

  // Оборачиваем updateQuantity в useCallback
  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      setShoppingCart(prevCart => {
        // Обновляем корзину, фильтруя товары с количеством 0
        const updatedShoppingCart = prevCart
          .map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0); // Убираем товары с нулевым количеством

        return updatedShoppingCart;
      });
    },
    [setShoppingCart],
  );

  const clearShoppingCart = useCallback(() => {
    setShoppingCart([]);
  }, [setShoppingCart]);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setQuery(query); // Обновляем query в глобальном контексте
  //   }, 1000); // Задержка 1 секунда

  //   return () => clearTimeout(timeout); // Очистка таймера при каждом изменении query
  // }, [query, setQuery]); // Зависимость от query

  const data = useMemo(
    () => ({
      products,
      setProducts,
      sortBy,
      setSortBy,
      shoppingCart,
      setShoppingCart,
      favorites,
      setFavorites,
      updateQuantity,
      clearShoppingCart,
      query,
      setQuery,
    }),
    [
      products,
      sortBy,
      shoppingCart,
      favorites,
      query,
      setProducts,
      setSortBy,
      setShoppingCart,
      setFavorites,
      setQuery,
      clearShoppingCart,
      updateQuantity,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
