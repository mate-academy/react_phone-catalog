import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  color?: string;
  capacity?: string;
  category?: string;
  price: number;
  quantity: number;
}

type CartProduct = Omit<CartItem, 'quantity'>;

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: CartProduct) => void;
  toggleCartItem: (item: CartProduct) => void;
  getFromCart: () => CartItem[];
  isInCart: (item: CartProduct) => boolean;
  getTotal: (items: CartItem[]) => { allPrice(): number; Items(): number };
  getItemTotalPrice: (item: CartItem) => number;
  onSubtractFromCart: (item: CartItem) => void;
  removeFromCart: (item: CartProduct) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      localStorage.removeItem('cartItems');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const isSameItem = (a: CartProduct, b: CartItem) =>
    a.id === b.id && a.color === b.color && a.capacity === b.capacity;

  const addToCart = (newItem: CartProduct) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => isSameItem(newItem, item));

      if (index >= 0) {
        const updated = [...prevCart];

        updated[index].quantity += 1;

        return updated;
      }

      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const toggleCartItem = (item: CartProduct) => {
    setCart(prevCart => {
      const exists = prevCart.some(cartItem => isSameItem(item, cartItem));

      if (exists) {
        return prevCart.filter(cartItem => !isSameItem(item, cartItem));
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const isInCart = (item: CartProduct): boolean => {
    return cart.some(cartItem => isSameItem(item, cartItem));
  };

  const onSubtractFromCart = (targetItem: CartItem) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (!isSameItem(targetItem, item)) {
            return item;
          }

          return { ...item, quantity: item.quantity - 1 };
        })
        .filter(item => item.quantity > 0),
    );
  };

  const removeFromCart = (targetItem: CartProduct) => {
    setCart(prevCart => prevCart.filter(item => !isSameItem(targetItem, item)));
  };

  const getFromCart = () => cart;

  const getItemTotalPrice = (item: CartItem) => item.price * item.quantity;

  const getTotal = (cartItems: CartItem[]) => ({
    allPrice() {
      return cartItems.reduce((acc, item) => acc + getItemTotalPrice(item), 0);
    },
    Items() {
      return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  });

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        toggleCartItem,
        getFromCart,
        isInCart,
        getTotal,
        getItemTotalPrice,
        removeFromCart,
        onSubtractFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
