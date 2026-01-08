import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CartItem } from '@/types/CartItem';
import { Product } from '@/types/Product';
import { createContext, FC, ReactNode } from 'react';

interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartContextType {
  toggleToCart: (product: Product) => void;
  inCart: (productId: Product['id']) => boolean;
  cart: Cart;
  changeProductCount: (product: Product, newCount: number) => void;
  removeFromCart: (productId: Product['id']) => void;
  clearCart: () => void;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Cart>('cart', {
    items: [],
    total: 0,
  });

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => {
      const price = item.product.price ?? item.product.fullPrice;

      return sum + price * item.count;
    }, 0);
  };

  const toggleToCart = (product: Product) => {
    setCart(curCart => {
      const isInCart = curCart.items.some(
        item => item.product.id === product.id,
      );

      let newItems;

      if (isInCart) {
        newItems = curCart.items.filter(item => {
          const {
            product: { id },
          } = item;

          return id !== product.id;
        });
      } else {
        newItems = [
          ...curCart.items,
          {
            product,
            count: 1,
          },
        ];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const changeProductCount = (product: Product, newCount: number) => {
    if (newCount < 1) {
      return;
    }

    setCart(curCart => {
      const newItems = curCart.items.map(item => {
        return item.product.id === product.id
          ? {
              ...item,
              count: newCount,
            }
          : item;
      });

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const inCart = (productId: Product['id']) => {
    return cart.items.some(item => item.product.id === productId);
  };

  const removeFromCart = (productId: Product['id']) => {
    const existItem = cart.items.some(item => item.product.id === productId);

    if (!existItem) {
      return;
    }

    const newItems = cart.items.filter(item => item.product.id !== productId);

    setCart({
      items: newItems,
      total: calculateTotal(newItems),
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
    });
  };

  const totalItems = cart.items.reduce((acc, curItem) => acc + curItem.count, 0);

  return (
    <CartContext.Provider
      value={{
        toggleToCart,
        inCart,
        cart,
        changeProductCount,
        removeFromCart,
        clearCart,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
