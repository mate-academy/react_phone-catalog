import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../types/Product';

type ProductsContextType = {
  products: Product[],
  loadingProducts: () => void,
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
};

export const ProductsContext = React.createContext({} as ProductsContextType);

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadingProducts = () => {
    getProducts().then(result => {
      const newProducts:Product[] = result.map(
        (item: Product) => ({
          ...item,
          priceWithDiscount: ((100 - item.discount) / 100) * item.price,
          inOrder: false,
          inFavourite: false,
          quantityInOrder: 0,
        }),
      );

      setProducts(newProducts);
    });
  };

  const getLocalStorage = () => {
    if (localStorage.getItem('cart') !== null) {
      setProducts(JSON.parse(localStorage.getItem('products') || ''));
    } else {
      loadingProducts();
    }
  };

  const updateStorage = () => {
    if (products.length) {
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      localStorage.removeItem('products');
    }
  };

  const phones = [...products].filter(product => product.type === 'phone');

  const tablets = [...products].filter(product => product.type === 'tablet');

  const accessories = [...products].filter(
    product => product.type === 'accessory',
  );

  const contextValue = {
    products,
    loadingProducts,
    phones,
    tablets,
    accessories,
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [products]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
