import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: string;
  quantity: number;
}

interface ShoppingCartContext {
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const jsonValue = localStorage.getItem('cart');
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  const increaseItemQuantity = (id: string) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item;
          }
        })
      }
    })
  }

  const decreaseItemQuantity = (id: string) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id)
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item;
          }
        })
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id);
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
