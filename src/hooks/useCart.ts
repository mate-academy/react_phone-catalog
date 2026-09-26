import { useContext } from 'react';
import { CartContext } from '../components/context/CartContext';
import { saveCartItems } from '../api/cart';
import { CartItem } from '../types/CartItem';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  const { cartItems, setCartItems } = context;

  const handleAddToCart = (item: CartItem) => {
    const existingItem = cartItems.find(
      cartItem => cartItem.itemId === item.itemId,
    );

    if (existingItem) {
      return;
    }

    const updatedItems = [...cartItems, { ...item, quantity: 1 }];

    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const handleRemoveFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item.itemId !== itemId);

    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const handleIncreaseQuantity = (itemId: string) => {
    const updatedItems = cartItems.map(item =>
      item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (itemId: string) => {
    const updatedItems = cartItems.map(item =>
      item.itemId === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const isInCart = (itemId: string) => {
    return cartItems.some(item => item.itemId === itemId);
  };

  return {
    cartItems,
    setCartItems,
    handleAddToCart,
    isInCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};
