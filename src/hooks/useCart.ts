import { useContext } from 'react';
import { CartContext } from '../services/CartContext';

export const useCart = (id: string | null) => {
  const { cart, setCart } = useContext(CartContext)!;

  const inCart = id ? cart.includes(id) : false;

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    setCart(prev => (inCart ? prev.filter(el => el !== id) : [...prev, id]));
  };

  return { inCart, toggleCart };
};
