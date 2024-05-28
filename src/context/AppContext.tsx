import { createContext, useCallback, useEffect } from 'react';
import { Product } from '../types/ProductCard';
import { CartProducts } from '../types/CartProducts';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type CartContextType = {
  cartProducts: CartProducts;
  addToCart: (product: Product) => void;
  incrementProductInCart: (productId: Product['id']) => void;
  decrementProductInCart: (productId: Product['id']) => void;
  removeFromCart: (productId: Product['id']) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartProducts: {},
  addToCart: () => {},
  incrementProductInCart: () => {},
  decrementProductInCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useLocalStorage(
    'cart',
    {} as CartProducts,
  );

  useEffect(() => {
    // Save the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const clearCart = () => {
    setCartProducts({});
  };

  const removeFromCart = (productId: Product['id']) => {
    // If exists, remove it from the cart
    if (productId in cartProducts) {
      setCartProducts((currentCart: CartProducts) => {
        const cartCopy = { ...currentCart };

        delete cartCopy[productId];

        return cartCopy;
      });
    }
  };

  const incrementProductInCart = useCallback(
    (productId: Product['id']) => {
      setCartProducts((currentCart: CartProducts) => ({
        ...currentCart,
        [productId]: {
          ...currentCart[productId],
          quantity: currentCart[productId].quantity + 1,
        },
      }));
    },
    [setCartProducts],
  );

  // Perform only if current quantity is above 1
  const decrementProductInCart = useCallback(
    (productId: Product['id']) => {
      if (cartProducts[productId].quantity > 1) {
        setCartProducts(currentCart => ({
          ...currentCart,
          [productId]: {
            ...currentCart[productId],
            quantity: currentCart[productId].quantity - 1,
          },
        }));
      }
    },
    [cartProducts, setCartProducts],
  );

  const addToCart = (product: Product) => {
    if (!(product.id in cartProducts)) {
      setCartProducts((currentCart: CartProducts) => ({
        ...currentCart,
        [product.id]: {
          product: product,
          quantity: 1,
        },
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        incrementProductInCart,
        decrementProductInCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
