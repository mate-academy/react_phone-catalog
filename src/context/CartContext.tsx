import { createContext, useEffect, useState } from 'react';
import { CartItem } from 'types/CartItem';
import { ProductPreview } from 'types/ProductPreview';

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addToCart: (product: ProductPreview) => void;
  deleteItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalItemsOfCart: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  deleteItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  totalItemsOfCart: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cartProducts');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    cartItems,
    setCartItems,
    addToCart: (product: ProductPreview) => {
      setCartItems(prev => {
        const productId = product.id.toString();
        const isInCart = prev.some(item => item.product.id === product.id);

        if (isInCart) {
          return prev.filter(item => item.product.id !== product.id);
        }

        return [...prev, { id: productId, quantity: 1, product }];
      });
    },
    deleteItem: (id: string) => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    },
    increaseQuantity: (id: string) => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    },
    decreaseQuantity: (id: string) => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    },
    clearCart: () => {
      setCartItems([]);
    },
    totalItemsOfCart: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
