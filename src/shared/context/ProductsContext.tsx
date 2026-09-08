import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { ProductsInfo } from '../types/ProductsInfo';
import { getPhones } from '../../api/phones';
import { getTablets } from '../../api/tablets';
import { getAccessories } from '../../api/accessories';
import { getProducts } from '../../api/products';
import { usePersistedState } from '../hooks/usePersistedState';

export type CartItem = Product & { quantity: number };

type ProductsContextType = {
  products: Product[];
  phones: ProductsInfo[];
  tablets: ProductsInfo[];
  accessories: ProductsInfo[];
  hotProducts: Product[];
  newModels: Product[];
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductsInfo[]>([]);
  const [tablets, setTablets] = useState<ProductsInfo[]>([]);
  const [accessories, setAccessories] = useState<ProductsInfo[]>([]);

  const [favorites, setFavorites] = usePersistedState<Product[]>(
    'favorites',
    [],
  );
  const [cartItems, setCartItems] = usePersistedState<CartItem[]>(
    'cartItems',
    [],
  );

  const hotProducts = products
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);

  const newModels = [...products].sort((a, b) => b.year - a.year).slice(0, 20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts(await getProducts());
        setPhones(await getPhones());
        setTablets(await getTablets());
        setAccessories(await getAccessories());
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        phones,
        tablets,
        accessories,
        hotProducts,
        newModels,
        favorites,
        setFavorites,
        cartItems,
        setCartItems,
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
