import { Product } from '../../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useCart() {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const isInCart = prevCart.some(p => p.itemId === product.itemId);

      if (isInCart) {
        return prevCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(p => p.itemId !== itemId));
  };

  const toggleCartItem = (product: Product) => {
    setCart(prevCart => {
      const isInCart = prevCart.some(p => p.itemId === product.itemId);

      return isInCart
        ? prevCart.filter(p => p.itemId !== product.itemId)
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const totalCartItems = cart.reduce((acc, p) => acc + p.quantity, 0);
  const totalCartPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    toggleCartItem,
    clearCart,
    totalCartItems,
    totalCartPrice,
  };
}
