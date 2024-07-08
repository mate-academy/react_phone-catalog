import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { useLocalStorage } from '../../helpers/useLocalStorage';

export type CartItem = {
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  id: string;
  quantity: number;
};

type ContextType = {
  products: Product[];
  favorites: Product[];
  addToFavorites: (v: Product) => void;
  addToCart: (v: Product) => void;
  cartProducts: CartItem[];
  handleDeleteItem: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
  handleIncreaseQuantity: (id: string) => void;
};

export const GlobalContext = React.createContext<ContextType>({
  products: [],
  favorites: [],
  addToFavorites: () => {},
  addToCart: () => {},
  cartProducts: [],
  handleDeleteItem: () => {},
  handleDecreaseQuantity: () => {},
  handleIncreaseQuantity: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('fav', []);
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    'cart',
    [],
  );

  const addToFavorites = (product: Product) => {
    if (favorites.some((item: Product) => item.id === product.id)) {
      setFavorites((currentFav: Product[]) =>
        currentFav.filter(fav => fav.id !== product.id),
      );
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const addToCart = (product: Product) => {
    if (cartProducts.some((item: CartItem) => item.id === product.id)) {
      setCartProducts((currentCart: CartItem[]) =>
        currentCart.filter(item => item.id !== product.id),
      );
    } else {
      setCartProducts([
        ...cartProducts,
        { ...product, id: product.id, quantity: 1 },
      ]);
    }
  };

  useEffect(() => {
    getProducts().then(setProducts).catch().finally();
  }, []);

  const handleIncreaseQuantity = (id: string) => {
    const newList = cartProducts.map((item: CartItem) => {
      if (item.id === id && item.quantity) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCartProducts(newList);
  };

  const handleDecreaseQuantity = (id: string) => {
    const newList = cartProducts.map((item: CartItem) => {
      if (item.id === id && item.quantity) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    });

    setCartProducts(newList);
  };

  const handleDeleteItem = (id: string) => {
    const newList = cartProducts.filter((item: CartItem) => item.id !== id);

    setCartProducts(newList);
  };

  const value = useMemo(
    () => ({
      products,
      favorites,
      addToFavorites,
      addToCart,
      cartProducts,
      handleDeleteItem,
      handleDecreaseQuantity,
      handleIncreaseQuantity,
    }),
    [cartProducts, favorites, products],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
