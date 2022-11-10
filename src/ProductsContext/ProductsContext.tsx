import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../api/products';
import UseLocalStorage from '../hooks/UseLocalStorage';

import { Product } from '../types/Product';

type ContextProps = {
  products: Product[]
  productsList: (type: string, sort: string, query: string) => Product[]
  favProducts: Product[]
  setFavProducts: React.Dispatch<React.SetStateAction<Product[] | []>>,
  cart:Product[]
  setCart: React.Dispatch<React.SetStateAction<Product[] | []>>,
};

export const ProductsContext = React.createContext<ContextProps>({
  products: [],
  productsList: () => [],
  favProducts: [],
  setFavProducts: () => {},
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);
  // eslint-disable-next-line max-len
  const [favProducts, setFavProducts] = UseLocalStorage<Product[]>('favProducts', []);
  const [cart, setCart] = UseLocalStorage<Product[]>('cart', []);

  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productsList = (type: string, sort: string, query: string) => {
    return [...products].filter(product => product.type === type)
      .map((product: Product) => ({
        ...product,
        newPrice: (
          product.discount
            ? (product.price - ((product.discount * product.price) / 100))
              .toString()
            : null
        ),
      })).sort((product1, product2) => {
        switch (sort) {
          case 'newest':
            return +product2.age - +product1.age;
          case 'priceDown':
            return product2.price - product1.price;
          case 'priceUp':
            return product1.price - product2.price;
          case 'discount':
            return product2.discount - product1.discount;
          default:
            return 0;
        }
      }).filter(product => {
        return product.name.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());
      });
  };

  const contextValue = useMemo(() => {
    return {
      products,
      productsList,
      favProducts,
      setFavProducts,
      cart,
      setCart,
    };
  }, [products, favProducts, cart]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
