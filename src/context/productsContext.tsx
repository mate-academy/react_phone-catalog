import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Product } from '../types';
import { getProducts } from '../api/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SortByType } from '../types/enums/SortByType';

type ProductContext = {
  products: Product[],
  favourites: Product [],
  setFavourites: (product: Product[]) => void,
  cart: Product[],
  setToCart: (product: Product[]) => void,
  filteredProducts: Product[],
  sortBy: string,
  setSortBy: (type: string) => void,
  query: string,
  setQuery: (query: string) => void,
};

export const ProductsContext = React
  .createContext<ProductContext>({} as ProductContext);

type Props = {
  children: ReactNode,
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites]
  = useLocalStorage<Product[]>('favourites', []);
  const [cart, setToCart] = useLocalStorage<Product[]>('cart', []);
  const [sortBy, setSortBy] = useState<string>(SortByType.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case SortByType.all:
        return sortedProducts;
      case SortByType.alphabetically:
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case SortByType.newest:
        return sortedProducts.sort((a, b) => b.year - a.year);
      case SortByType.cheapest:
        return sortedProducts.sort((a, b) => a.price - b.price);
      default:
        return sortedProducts;
    }
  }, [sortBy, products]);

  const filteredProductsByQuery = filteredProducts
    .filter((product) => product.name
      .toLowerCase()
      .includes(query
        .toLowerCase()));

  const filteredFavouritesByQuery = favourites
    .filter((product) => product.name
      .toLowerCase()
      .includes(query
        .toLowerCase()));

  const value = {
    filteredProducts: filteredProductsByQuery,
    products,
    favourites: filteredFavouritesByQuery,
    setFavourites,
    setProducts,
    cart,
    setToCart,
    setSortBy,
    sortBy,
    query,
    setQuery,
  };

  return (
    <ProductsContext.Provider
      value={value}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (
):ProductContext => React.useContext(ProductsContext);
