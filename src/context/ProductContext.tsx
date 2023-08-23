import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

// eslint-disable-next-line max-len
const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

type ContextItems = {
  products: Product[];
  // getHotPriceProducts: () => void;
};

export const ProductsContext = React.createContext<ContextItems>({
  products: [],
  // getHotPriceProducts: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(PRODUCTS_URL);
        const data = await response.json();

        setProducts(data);
      } catch {
        throw new Error('Unable to add products, please try again later');
      }
    }

    fetchProducts();
  }, []);

  // const getHotPriceProducts = (prods: Product[]) => {
  //   const discountedProducts = prods
  //     .filter(p => p.discount !== 0);

  //   discountedProducts.sort((a, b) => {
  //     const discountA = a.price * (a.discount / 100);
  //     const discountB = b.price * (b.discount / 100);

  //     return discountB - discountA;
  //   });

  //   return discountedProducts;
  // };

  // const hotProceProducts = getHotPriceProducts();

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}
