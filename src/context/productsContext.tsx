import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Product } from '../types';
import { getProducts } from '../api/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProductSortingOption } from '../types/enums/ProductSortingOption';

type ProductContext = {
  products: Product[],
  favourites: Product [],
  setFavourites: (product: Product[]) => void,
  filteredPhones: Product[],
  sortBy: string,
  setSortBy: (type: string) => void,
  searchQuery: string,
  setSearchQuery: (query: string) => void,
  loading: boolean,
  filteredTablets: Product[],
  filteredAccessories: Product[],
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
  const [sortBy, setSortBy] = useState<string>(ProductSortingOption.all);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const categories = {
    phones: products.filter(product => product.category === 'phones'),
    tablets: products.filter(product => product.category === 'tablets'),
    accessories: products.filter(product => product.category === 'accessories'),
  };

  const { phones, tablets, accessories } = categories;

  const getFilteredProducts = (productsToFilter: Product[]) => {
    const sortedProducts = [...productsToFilter];

    switch (sortBy) {
      case ProductSortingOption.all:
        return sortedProducts;
      case ProductSortingOption.alphabetically:
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case ProductSortingOption.newest:
        return sortedProducts.sort((a, b) => b.year - a.year);
      case ProductSortingOption.cheapest:
        return sortedProducts.sort((a, b) => a.price - b.price);
      default:
        return sortedProducts;
    }
  };

  const filteredPhones = useMemo(() => {
    return getFilteredProducts(phones);
  }, [sortBy, phones]);

  const filteredTablets = useMemo(() => {
    return getFilteredProducts(tablets);
  }, [sortBy, tablets]);

  const filteredAccessories = useMemo(() => {
    return getFilteredProducts(accessories);
  }, [sortBy, tablets]);

  const searchInPhones = filteredPhones
    .filter((product) => product.name
      .toLowerCase()
      .includes(searchQuery.trim()
        .toLowerCase()));

  const searchInFavorites = favourites
    .filter((product) => product.name
      .toLowerCase()
      .includes(searchQuery
        .toLowerCase()));

  const value = {
    filteredPhones: searchInPhones,
    products,
    favourites: searchInFavorites,
    setFavourites,
    setProducts,
    setSortBy,
    sortBy,
    searchQuery,
    setSearchQuery,
    loading,
    filteredTablets,
    filteredAccessories,
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
