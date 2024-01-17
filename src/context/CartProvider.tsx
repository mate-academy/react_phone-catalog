import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
} from 'react';
import {
  CartAction,
  CartContextType,
  CartState,
  ProductForCart,
} from '../types/ProductForCart';

export const CartContext = createContext<
CartContextType | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) => (
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )),
      };

    default:
      return state;
  }
};

const saveStateToLocalStorage = (cart: ProductForCart[]): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const CartProvider: React.FC<{
  children: ReactNode,
}> = ({ children }) => {
  const getInitialStateFromLocalStorage = (): CartState => {
    const storedCart = localStorage.getItem('cart');

    return {
      cart: storedCart ? JSON.parse(storedCart) : [],
    };
  };

  const [state, dispatch] = useReducer(
    cartReducer,
    getInitialStateFromLocalStorage(),
  );

  const handleAddToCart = (product: ProductForCart) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    saveStateToLocalStorage([...state.cart, product]);
  };

  const handleRemoveFromCart = (product: ProductForCart) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    saveStateToLocalStorage(state.cart.filter(item => item.id !== product.id));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const updatedProduct = state.cart.find((item) => item.id === productId);

    if (updatedProduct) {
      const updatedCart = state.cart.map((item) => (
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));

      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { ...updatedProduct, quantity: newQuantity },
      });

      saveStateToLocalStorage(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{
      cart: state.cart,
      handleAddToCart,
      handleRemoveFromCart,
      updateQuantity: handleUpdateQuantity,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    updateQuantity,
  } = context;

  const handleAddToCartWithLocalStorage = (product: ProductForCart) => {
    handleAddToCart(product);
    saveStateToLocalStorage([...cart, product]);
  };

  const handleRemoveFromCartWithLocalStorage = (product: ProductForCart) => {
    handleRemoveFromCart(product);
    saveStateToLocalStorage(cart.filter(item => item.id !== product.id));
  };

  const handleUpdateQuantityWithLocalStorage = (
    productId: string, newQuantity: number,
  ) => {
    const updatedProduct = cart.find((item) => item.id === productId);

    if (updatedProduct) {
      updateQuantity(productId, newQuantity);

      const updatedCart = cart.map((item) => (
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));

      saveStateToLocalStorage(updatedCart);
    }
  };

  return {
    cart,
    handleAddToCart: handleAddToCartWithLocalStorage,
    handleRemoveFromCart: handleRemoveFromCartWithLocalStorage,
    updateQuantity: handleUpdateQuantityWithLocalStorage,
  };
};
