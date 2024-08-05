import { Product } from '../types/Product';
import { CartItems } from '../types/CartItems';
import { useLocalStorage } from '../utils/useLocalStorage';
import { createContext, useCallback, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  favourites: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (productId: string) => void;
  cart: CartItems[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  manageCartItems: (productId: string, count: number) => void;
  countTotalPrice: () => number;
  clearCart: () => void;
};

const AppContext = createContext<AppContextType>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  manageCartItems: () => {},
  countTotalPrice: () => 0,
  clearCart: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );
  const [cart, setCart] = useLocalStorage<CartItems[]>('cart', []);

  const addToFavourites = useCallback(
    (product: Product) => {
      setFavourites((prevFavourites: Product[]) => [
        ...prevFavourites,
        product,
      ]);
    },
    [setFavourites],
  );

  const removeFromFavourites = useCallback(
    (productId: string) => {
      setFavourites((prevFavourites: Product[]) =>
        prevFavourites.filter(product => product.itemId !== productId),
      );
    },
    [setFavourites],
  );

  const addToCart = useCallback(
    (product: Product) => {
      setCart(prevCart => [...prevCart, { product, quantity: 1 }]);
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart: CartItems[]) =>
        prevCart.filter(cartItem => cartItem.product.itemId !== productId),
      );
    },
    [setCart],
  );

  const manageCartItems = useCallback(
    (productId: string, count: number) => {
      setCart(currCart =>
        currCart.map(cartItem => {
          if (cartItem.product.itemId === productId) {
            const newCount = Math.max(cartItem.quantity + count, 1);

            return { ...cartItem, quantity: newCount };
          }

          return cartItem;
        }),
      );
    },
    [setCart],
  );

  const countTotalPrice = useCallback(() => {
    return Math.floor(
      cart.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0,
      ),
    );
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  return (
    <AppContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        cart,
        addToCart,
        removeFromCart,
        manageCartItems,
        countTotalPrice,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
