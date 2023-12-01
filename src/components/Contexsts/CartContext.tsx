import { useContext, createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type CartItem = {
  id: number,
  quantity: number,
};

type CartsContext = {
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getItemQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartsContext);

export const useCart = () => useContext(CartContext);

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    return JSON.parse(data);
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    [],
  );
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (id: number) => {
    if (cartItems.find((item) => item.id === id) == null) {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    } else {
      const newCardItems = cartItems.map(
        (item: { id: number; quantity: number }) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        },
      );

      setCartItems(newCardItems);
    }
  };

  const increaseQuantity = (id: number) => {
    if (cartItems.find(item => item.id === id) == null) {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    } else {
      const newCartItems = cartItems.map(
        (item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        },
      );

      setCartItems(newCartItems);
    }
  };

  const decreaseQuantity = (id: number) => {
    if (cartItems.find(item => item.id === id) == null) {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    } else {
      const newCartItems = cartItems.map(
        (item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        },
      );

      setCartItems(newCartItems);
    }
  };

  const removeFromCart = (id: number) => {
    const newCarts = cartItems.filter(item => item.id !== id);

    setCartItems(newCarts);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
