import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { CartProps, Product } from '../helpers/Types';
import { fetchData } from '../helpers/Api';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MyContextProps {
  products: Product[];
  favourites: Product[];
  cart: CartProps[];
  toggleToFavourites: (id: string) => void;
  toggleToCart: (id: string) => void;
  isInFavourites: (id: string) => boolean;
  isInCart: (id: string) => boolean;
  increaseQuantityInCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantityInCart: (id: number) => void;
  error: boolean;
  handleError: () => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps>
= ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites]
  = useLocalStorage<Product[]>('favourites', []);
  const [cart, setCart] = useLocalStorage<CartProps[]>('cart', []);

  useEffect(() => {
    const fetchDataFromJson = async () => {
      const jsonData = await fetchData();

      setProducts(() => jsonData);
    };

    fetchDataFromJson();
  }, []);

  const toggleToFavourites = (itemId: string) => {
    const indexInFavourites = favourites.findIndex((item) => (
      item.id === itemId));

    if (indexInFavourites === -1) {
      const product = products.find((item) => item.id === itemId);

      if (product) {
        setFavourites((prev) => [...prev, product]);
      }
    } else {
      setFavourites((prev) => prev.filter((product) => (
        product.id !== itemId)));
    }
  };

  const toggleToCart = (itemId: string) => {
    const indexInCart = cart.findIndex((item) => (
      item.product.id === itemId));

    if (indexInCart === -1) {
      const product = products.find((item) => item.id === itemId);

      if (product) {
        setCart((prev) => [...prev, {
          id: new Date().getTime(), product, quantity: 1,
        }]);
      }
    } else {
      setCart((prev) => prev.filter((product) => (
        product.product.id !== itemId)));
    }
  };

  const increaseQuantityInCart = (id: number) => {
    const itemsInCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCart(itemsInCart);
  };

  const removeFromCart = (id: number) => {
    const itemsInCart = cart.filter((item) => item.id !== id);

    setCart(itemsInCart);
  };

  const decreaseQuantityInCart = (id: number) => {
    const itemsInCart = cart.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity - 1;

        if (updatedQuantity === 0) {
          removeFromCart(id);

          return null;
        }

        return { ...item, quantity: updatedQuantity };
      }

      return item;
    }).filter((item) => item !== null) as CartProps[];

    setCart(itemsInCart);
  };

  const isInFavourites = (itemId: string): boolean => (
    favourites.findIndex((item) => item.id === itemId) !== -1);

  const isInCart = (itemId: string): boolean => (
    cart.findIndex((item) => item.product.id === itemId) !== -1);

  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);

    setTimeout(() => setError(false), 5000);
  };

  return (
    <MyContext.Provider value={{
      products,
      favourites,
      cart,
      toggleToFavourites,
      toggleToCart,
      isInFavourites,
      isInCart,
      increaseQuantityInCart,
      removeFromCart,
      decreaseQuantityInCart,
      error,
      handleError,
    }}
    >
      {children}
    </MyContext.Provider>
  );
};
