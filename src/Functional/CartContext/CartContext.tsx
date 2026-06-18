import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  capacity?: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  favorites: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  toggleFavorite: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getItemKey = (item: CartItem) =>
  `${item.id}-${item.color}-${item.capacity}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity,
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.capacity === item.capacity
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (key: string) => {
    setCart(prevCart =>
      prevCart.filter(item => getItemKey(item) !== key),
    );
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key);

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        getItemKey(item) === key ? { ...item, quantity } : item,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
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