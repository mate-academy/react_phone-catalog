import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTablets } from './TabletsContext';
import { useAccessories } from './AccessoriesContext';
import { usePhones } from './PhonesContext';
import { Item } from '../types/Item';
import { Product } from '../types/Product';

type ProductContextType = {
  allProducts: Product[];
  setTransformedProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  transformedProducts: Item[];
  newestModels: Item[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// eslint-disable-next-line max-len
export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transformedProducts, setTransformedProducts] = useState<Item[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [newestModels, setNewestModels] = useState<Item[]>([]);
  const { phones } = usePhones();
  const { tablets } = useTablets();
  const { accessories } = useAccessories();

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(result => {
        setAllProducts(result);

        const products: Item[] = [];

        for (const product of result) {
          let item: Item | undefined;

          if (product.category === 'phones') {
            item = phones.find(x => x.id === product.itemId);
          } else if (product.category === 'tablets') {
            item = tablets.find(x => x.id === product.itemId);
          } else if (product.category === 'accessories') {
            item = accessories.find(x => x.id === product.itemId);
          }

          if (item) {
            products.push(item);
          }
        }

        setTransformedProducts(products);

        const newestProducts = [...result].sort((x, y) => y.year - x.year);

        const newestItems: Item[] = [];

        for (const product of newestProducts) {
          let item: Item | undefined;

          if (product.category === 'phones') {
            item = phones.find(x => x.id === product.itemId);
          } else if (product.category === 'tablets') {
            item = tablets.find(x => x.id === product.itemId);
          } else if (product.category === 'accessories') {
            item = accessories.find(x => x.id === product.itemId);
          }

          if (item) {
            newestItems.push(item);
          }
        }

        setNewestModels(newestItems);
      });
  }, [accessories, phones, tablets]);

  // eslint-disable-next-line max-len
  return (
    <ProductContext.Provider
      // eslint-disable-next-line max-len
      value={{ allProducts, transformedProducts, setTransformedProducts, newestModels }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
