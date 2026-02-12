import { CART_KEY } from '../../../constants/localStorages';
import { CartProduct, Product } from '../../../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useCartStorage() {
  const {
    value: cart,
    setValue: setCart,
    error,
  } = useLocalStorage<CartProduct[]>(CART_KEY, []);

  const toggleToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);

      if (!existing) {
        return [...prev, { ...product, count: 1 }];
      }

      return prev.filter(el => product.id !== el.id);
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const increaseCount = (productId: number) => {
    setCart(prev =>
      prev.map(p => (p.id === productId ? { ...p, count: p.count + 1 } : p)),
    );
  };

  const decreaseCount = (productId: number) => {
    setCart(prev =>
      prev
        .map(p => (p.id === productId ? { ...p, count: p.count - 1 } : p))
        .filter(p => p.count > 0),
    );
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    error: error?.code,
    toggleToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    clearCart,
  };
}
