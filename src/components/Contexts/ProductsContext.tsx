import React, { useEffect, useState } from 'react';
import { ProductsType } from '../../types/Products';
import { getProducts } from '../../utils/FetchClient';

type ProductContextProps = {
  products: ProductsType[];
  loading: boolean;
  error: boolean;
  addItem: (id: string, currentList: ProductsType[]) => ProductsType[];
  deleteItem: (id: string, currentList: ProductsType[]) => ProductsType[];
  checkProduct: (id: string, currentList: ProductsType[]) => boolean;
};

export const ProductContext = React.createContext<ProductContextProps>({
  products: [],
  loading: false,
  error: false,
  addItem: () => [],
  deleteItem: () => [],
  checkProduct: () => true || false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const findItem = (list: ProductsType[], id: string) => {
    return list.find(item => item.itemId === id);
  };

  const addItem = (id: string, currentList: ProductsType[]) => {
    const newItem = findItem(products, id);

    return newItem ? [...currentList, newItem] : [...currentList];
  };

  const deleteItem = (id: string, currentList: ProductsType[]) => {
    return [...currentList].filter(currentItem => currentItem.itemId !== id);
  };

  const checkProduct = (id: string, currentList: ProductsType[]) => {
    return currentList.some(item => item.itemId === id);
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addItem, deleteItem, checkProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
