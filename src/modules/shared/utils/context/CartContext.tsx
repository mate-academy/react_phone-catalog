/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType, ProductType } from '../types';
//#endregion IMPORTS

//#region CONTEXT_INITIALIZATION
interface CartContextType {
  // стейт із товарами кошика
  // (де кожен товар пам'ятає свою кількість)
  cart: CartItemType[];

  // функція додати в кошик
  addToCart: (product: ProductType) => void;

  // функція видалити із кошика
  removeCart: (itemId: string) => void;

  // очистити кошик
  clearCart: () => void;

  // функція для кнопок + та - на сторінці кошика
  updateQuantity: (itemId: string, action: 'increment' | 'decrement') => void;

  // перевірка для зміни тексту кнопки
  // ("Add to card" / "Added") та стилів
  isInCart: (itemId: string) => boolean;

  // готова розраховані значення для
  // шапки сайту та чеку обчислення
  totalCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
//#endregion CONTEXT_INITIALIZATION

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //#region STATE
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  //#endregion STATE

  //#region COMPUTED_VALUES
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  //#endregion COMPUTED_VALUES

  //#region METHODS
  const isInCart = (itemId: string) =>
    cart.some(item => item.product.itemId === itemId);

  function addToCart(product: ProductType) {
    if (!isInCart(product.itemId)) {
      setCart(prev => [...prev, { product: product, quantity: 1 }]);
    }
  }

  function removeCart(itemId: string) {
    return setCart(prev => prev.filter(item => item.product.itemId !== itemId));
  }

  function clearCart() {
    setCart([]);
  }

  function updateQuantity(itemId: string, action: 'increment' | 'decrement') {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.itemId !== itemId) {
          return item;
        }

        if (action === 'decrement' && item.quantity === 1) {
          return item;
        }

        const newQuantity =
          action === 'increment' ? item.quantity + 1 : item.quantity - 1;

        return {
          ...item,
          quantity: newQuantity,
        };
      });
    });
  }
  //#endregion METHODS

  //#region RENDER
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeCart,
        clearCart,
        updateQuantity,
        isInCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
  //#endregion RENDER
};

//#region CUSTOM_HOOK
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
//#endregion CUSTOM_HOOK
