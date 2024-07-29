/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react';
import cardData from './api/phones.json';
import tabletsData from './api/tablets.json';
import accessoriesData from './api/accessories.json';
import productData from './api/products.json';
import { useLocalStorage } from './localStorage';
import { Access, Phone, Product } from './modules/pages/types/types';

export const PhoneContext = createContext(cardData);
export const TabletsContext = createContext(tabletsData);
export const AccessoriesContext = createContext(accessoriesData);
export const ProductsContext = createContext<{
  productData: Product[];
  items: (Phone | Access)[];
  setItems: (value:(Phone | Access)[]) => void;
}>({
      productData,
      items: [],
      setItems: () => {},
    });

export const useProductsContext = () => useContext(ProductsContext);

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useLocalStorage<(Phone | Access)[]>('bucket', []);

  const phones = cardData;
  const tablets = tabletsData;
  const accessories = accessoriesData;
  const products = {
    productData,
    items,
    setItems,
  };

  return (
    <ProductsContext.Provider value={products}>
      <AccessoriesContext.Provider value={accessories}>
        <TabletsContext.Provider value={tablets}>
          <PhoneContext.Provider value={phones}>
            {children}
          </PhoneContext.Provider>
        </TabletsContext.Provider>
      </AccessoriesContext.Provider>
    </ProductsContext.Provider>
  );
};
