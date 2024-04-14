import React, { useState, createContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import productsData from '../api/products.json';

type PropsProductsContext = {
  allProducts: Product[];
  getCategoriesProducts: (pathname: string) => Product[];
};

type Props = {
  children: React.ReactNode;
};

export const ProductsContext = createContext<PropsProductsContext>({
  allProducts: [],
  getCategoriesProducts: () => [],
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAllProducts(productsData);
  }, []);

  const getCategoriesProducts = (pathname: string) => {
    let categoriesProducts = [...allProducts];

    switch (pathname) {
      case '/phones':
        return (categoriesProducts = categoriesProducts.filter(
          product => product.category === Category.phone,
        ));

      case '/tablets':
        return (categoriesProducts = categoriesProducts.filter(
          product => product.category === Category.tablet,
        ));

      case '/accessories':
        return (categoriesProducts = categoriesProducts.filter(
          product => product.category === Category.accessory,
        ));

      default:
        return categoriesProducts;
    }
  };

  return (
    <ProductsContext.Provider value={{ allProducts, getCategoriesProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
