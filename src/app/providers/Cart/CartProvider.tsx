import { useLocalStorage } from '@/shared/Hooks';
import { ProductInCart } from '@/shared/type';
import { ReactNode, useMemo, useCallback } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<ProductInCart[]>('cart', []);

  const toggleCartProduct = useCallback(
    (id: string) => {
      setCart((prev) => {
        return prev.some((cartProduct) => cartProduct.id === id)
          ? prev.filter((cartProduct) => cartProduct.id !== id)
          : [...prev, { id, count: 1 }];
      });
    },
    [setCart],
  );

  const deleteCartProduct = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((product) => product.id !== id));
    },
    [setCart],
  );

  const setCountCartProduct = useCallback(
    (id: string, newValue: number | ((prev: number) => number)) => {
      setCart((prevCart) => {
        const func = newValue instanceof Function;

        const copyPrevCart = prevCart.map((product) => {
          if (product.id === id) {
            const newCount = func ? newValue(product.count) : newValue;
            if (newCount < 1) {
              return product;
            }
            return { id, count: newCount };
          } else {
            return product;
          }
        });

        return copyPrevCart;
      });
    },
    [setCart],
  );

  const totalItems = useMemo(() => {
    if (!cart) {
      return 1;
    }

    return cart.reduce((prev, current) => {
      return prev + current.count;
    }, 0);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCartProduct,
        setCountCartProduct,
        deleteCartProduct,
        totalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
