import { createContext } from 'react';
import { Gadget } from '../types/Gadgets';
import { Product } from '../types/Product';
import { useContext, useEffect, useState } from 'react';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
  phones: Gadget[];
  tablets: Gadget[];
  accessories: Gadget[];
  getGadgetById: (category: string, itemId: string) => Promise<Gadget>;
  getProductById: (id: string) => Promise<Product>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    try {
      const response = await fetch('/public/api/products.json');
      const data = await response.json();

      const products = [...data];

      setProducts(products);
    } catch (error) {
      setError(true);
    }
  };

  const getPhones = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch('/public/api/phones.json');
      const data = await response.json();

      const phones = [...data];

      setPhones(phones);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getTablets = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch('/public/api/tablets.json');
      const data = await response.json();

      const tablets = [...data];

      setTablets(tablets);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getAccessories = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch('/public/api/accessories.json');
      const data = await response.json();

      const accessoriesFromServer = [...data];

      setAccessories(accessoriesFromServer);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getGadgetById = async (category: string, itemId: string) => {
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(`${`/public/api/${category}.json`}`);
      const data = await response.json();

      // setTimeout(() => {
      const products = [...data];

      const neededProduct = products.find(p => p.id === itemId);

      return neededProduct;
      // }, 1000);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(`${`/public/api/products.json`}`);
      const data = await response.json();

      // setTimeout(() => {
      const products = [...data];

      const neededProduct = products.find(p => p.itemId === id);

      return neededProduct;
      // }, 1000);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getPhones();
    getTablets();
    getAccessories();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        phones,
        tablets,
        accessories,
        getGadgetById,
        getProductById,
      }}
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
