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

  const [favProducts, setFavProducts] = UseLocalStorage<Product[]>(
    'favProducts', [],
  );

  const [cart, setCart] = UseLocalStorage<Product[]>('cart', []);

  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortProducts = (productsToSort: Product[], sort: string): Product[] => {
    return productsToSort.sort((product1, product2) => {
      switch (sort) {
        case 'newest':
          return +product2.year - +product1.year;

        case 'priceDown':
          return product2.fullPrice - product1.fullPrice;

        case 'priceUp':
          return product1.fullPrice - product2.fullPrice;

        case 'discount':
          return product2.price - product1.price;

        default:
          return 0;
      }
    });
  };

  const filterProducts = (
    productsToFilter: Product[],
    query: string,
  ): Product[] => {
    return productsToFilter.filter(product => {
      return product.name.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  };

  const productsList = (category: string, sort: string, query: string) => {
    const productsWithPrice = [...products].filter(
      product => product.category === category,
    ).map((product: Product) => ({
      ...product,
      newPrice: (
        product.price
          ? (product.fullPrice - ((product.price * product.fullPrice) / 100))
            .toString()
          : null
      ),
    }));

    const sortedProducts = sortProducts(productsWithPrice, sort);

    return filterProducts(sortedProducts, query);
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
