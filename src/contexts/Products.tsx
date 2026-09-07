import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

export interface CategoryState {
  items: Product[];
  loading: boolean;
  error: boolean;
}

interface ProductsContextType {
  products: CategoryState;
  phones: CategoryState;
  tablets: CategoryState;
  accessories: CategoryState;
}

const ProductContext = createContext<ProductsContextType>({
  products: { items: [], loading: true, error: false },
  phones: { items: [], loading: true, error: false },
  tablets: { items: [], loading: true, error: false },
  accessories: { items: [], loading: true, error: false },
});

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<CategoryState>({ items: [], loading: true, error: false });
  const [phones, setPhones] = useState<CategoryState>({ items: [], loading: true, error: false });
  const [tablets, setTablets] = useState<CategoryState>({ items: [], loading: true, error: false });
  const [accessories, setAccessories] = useState<CategoryState>({
    items: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((data: Product[]) => setProducts({ items: data, loading: false, error: false }))
      .catch(() => setProducts(prev => ({ ...prev, loading: false, error: true })));

      fetch('./api/phones.json')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((data: Product[]) => setPhones({ items: data, loading: false, error: false }))
      .catch(() => setPhones(prev => ({ ...prev, loading: false, error: true })));

    fetch('./api/tablets.json')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((data: Product[]) => setTablets({ items: data, loading: false, error: false }))
      .catch(() => setTablets(prev => ({ ...prev, loading: false, error: true })));

    fetch('./api/accessories.json')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then((data: Product[]) => setAccessories({ items: data, loading: false, error: false }))
      .catch(() => setAccessories(prev => ({ ...prev, loading: false, error: true })));
  }, []);

  return <ProductContext.Provider value={{ products, phones, tablets, accessories }}>
    {children}
  </ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
