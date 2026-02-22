import React, { useEffect, useState } from 'react';

import { getProductsByCategory, getDisplayProducts } from '../utils/fetchApi';
import { Item, Product } from '../types/itemTypes';

type ProductCtx = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
  displayProduct: Item | null;
  setDisplayProduct: React.Dispatch<React.SetStateAction<Item | null>>;
  handleGetItemByCategory: (category: string, id: string) => void;
};

export const ProductContext = React.createContext<ProductCtx>({
  products: [],
  setProducts: () => {},
  favourites: [],
  setFavourites: () => { },
  displayProduct: null,
  setDisplayProduct: () => {},
  handleGetItemByCategory: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [displayProduct , setDisplayProduct] = useState<Item | null>(null);

  const [favourites, setFavourites] = useState<Product[]>(() => {
    const storedFavourites = localStorage.getItem('favourites');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const handleGetItemByCategory = async (category: string, id: string) => {
    const data = await getProductsByCategory(category);
    const product = data.find(( item: Item) => item.id === id);
    setDisplayProduct(product);
  };

  useEffect(() => {
    getDisplayProducts().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const ctxValue = {
    products,
    setProducts,
    favourites,
    setFavourites,
    displayProduct,
    setDisplayProduct,
    handleGetItemByCategory,
  };

  return (
    <ProductContext.Provider value={ctxValue}>
      {children}
    </ProductContext.Provider>
  );
};
