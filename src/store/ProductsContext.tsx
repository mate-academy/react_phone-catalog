/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { ProductType } from '../helpers/types/ProductType';
import { getProducts } from '../helpers/utils/api';
import { DetailType } from '../helpers/types/DetailType';

type ProductsContextType = {
  products: ProductType[];
  selectedProduct: DetailType | null;
  favoriteProducts: ProductType[];
  cartedProducts: ProductType[];
  phones: ProductType[];
  tablets: ProductType[];
  accessories: ProductType[];
  isLoading: boolean;
  query: string;
  setFavoriteProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
  setCartedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setSelectedProduct: React.Dispatch<React.SetStateAction<DetailType | null>>
};

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  selectedProduct: null,
  favoriteProducts: [],
  cartedProducts: [],
  phones: [],
  tablets: [],
  accessories: [],
  isLoading: false,
  query: '',
  setFavoriteProducts: () => { },
  setCartedProducts: () => { },
  setQuery: () => { },
  setSelectedProduct: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<ProductType[]>([]);
  const [cartedProducts, setCartedProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const [query, setQuery] = useState('');

  function loadProducts() {
    setIsLoading(true);
    getProducts()
      // .then(data => data.slice(6))
      .then(setProducts)
      // .catch(() => setIsError(true));
      .finally(() => setIsLoading(false));
  }

  useEffect(loadProducts, [query]);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablet');
  const accessories = products.filter(product => (
    product.category === 'accessories'
  ));

  // can delete products, setProducts, loading, setLoading phones, tablets, accessories from here?

  const value = {
    products,
    selectedProduct,
    favoriteProducts,
    cartedProducts,
    phones,
    tablets,
    accessories,
    isLoading,
    query,
    setFavoriteProducts,
    setCartedProducts,
    setQuery,
    setSelectedProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
