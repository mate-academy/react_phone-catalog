import { useContext } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { CartContext } from '../context/CartContext';

export const useAddToCart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (product: Product | undefined) => {
    if (!product) {
      return;
    }

    const newCartItem: CartItem = {
      id: product.id,
      quantity: 1,
      product,
    };

    setCartItems([...cartItems, newCartItem]);
    localStorage.setItem('cartItems', JSON.stringify(newCartItem));
  };

  return handleAddToCart;
};
