import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Details } from '../types/Details';

type ShopContextType = {
  favourites: Product[];
  basket: Product[];
  products: Product[];
  phones: Details[];
  tablets: Details[];
  accessories: Details[];
  toggleFavourite: (product: Product) => void;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  isFavourite: (productId: number) => boolean;
  isInBasket: (productId: number) => boolean;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Details[]>([]);
  const [tablets, setTablets] = useState<Details[]>([]);
  const [accessories, setAccessories] = useState<Details[]>([]);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  useEffect(() => {
    Promise.all([
      fetch('/api/products.json').then(res => res.json()),
      fetch('/api/phones.json').then(res => res.json()),
      fetch('/api/tablets.json').then(res => res.json()),
      fetch('/api/accessories.json').then(res => res.json()),
    ]).then(([productsData, phonesData, tabletsData, accessoriesData]) => {
      setProducts(productsData);
      setPhones(phonesData);
      setTablets(tabletsData);
      setAccessories(accessoriesData);
    });
  }, []);

  const addToBasket = (product: Product) => {
    setBasket(prev => [...prev, product]);
  };

  const removeFromBasket = (productId: number) => {
    setBasket(prev => prev.filter(product => product.id !== productId));
  };

  const isFavourite = (productId: number) => {
    return favourites.some(product => product.id === productId);
  };

  const isInBasket = (productId: number) => {
    return basket.some(product => product.id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        favourites,
        basket,
        products,
        phones,
        tablets,
        accessories,
        toggleFavourite,
        addToBasket,
        removeFromBasket,
        isFavourite,
        isInBasket,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('Error occured');
  }

  return context;
};
