import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { Gadget } from '../types/Gadget';

type ProductsContextType = {
  products: Product[];
  phones: Gadget[];
  tablets: Gadget[];
  accessories: Gadget[];
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        const productItems = [...data];

        setProducts(productItems);
      });
  }, []);

  useEffect(() => {
    fetch('./api/phones.json')
      .then(res => res.json())
      .then(data => {
        const phonesFromServer = [...data];

        setPhones(phonesFromServer);
      });
  }, []);

  useEffect(() => {
    fetch('./api/tablets.json')
      .then(res => res.json())
      .then(data => {
        const tabletsFromServer = [...data];

        setTablets(tabletsFromServer);
      });
  }, []);

  useEffect(() => {
    fetch('./api/accessories.json')
      .then(res => res.json())
      .then(data => {
        const accessoriesFromServer = [...data];

        setAccessories(accessoriesFromServer);
      });
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, phones, tablets, accessories }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
