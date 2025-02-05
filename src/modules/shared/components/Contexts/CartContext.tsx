import React, { useContext } from 'react';
import { Product, ProductInCart } from '../../types/types';
// eslint-disable-next-line max-len
import { useReducerWithLocalStorage } from '../../hooks/useReducerWithLocalStorage';

type HandleProductAdd = (newProduct: Product) => void;
type HandleProductRemove = (id: string) => void;
type HandleQuantityIncrement = (id: string) => void;
type HandleQuantityDecrement = (id: string) => void;
type HandleCartClear = () => void;

type CartContextValue = {
  cart: ProductInCart[];
  handleProductAdd: HandleProductAdd;
  handleProductRemove: HandleProductRemove;
  handleQuantityIncrement: HandleQuantityIncrement;
  handleQuantityDecrement: HandleQuantityDecrement;
  handleCartClear: HandleCartClear;
};

const CartContext = React.createContext<CartContextValue | null>(null);

type State = {
  cart: ProductInCart[];
};

type AddProductAction = {
  type: 'addProduct';
  payload: {
    product: Product;
  };
};

type RemoveProductAction = {
  type: 'removeProduct';
  payload: {
    id: string;
  };
};

type IncrementQuantityAction = {
  type: 'incrementQuantity';
  payload: {
    id: string;
  };
};

type DecrementQuantityAction = {
  type: 'decrementQuantity';
  payload: {
    id: string;
  };
};

type ClearCartAction = {
  type: 'clearCart';
};

type Action =
  | AddProductAction
  | RemoveProductAction
  | IncrementQuantityAction
  | DecrementQuantityAction
  | ClearCartAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addProduct':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.payload.product.itemId,
            quantity: 1,
            product: action.payload.product,
          },
        ],
      };
    case 'removeProduct':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id),
      };
    case 'incrementQuantity':
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      };
    case 'decrementQuantity':
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload.id && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      };
    case 'clearCart':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducerWithLocalStorage<State, Action>(
    'cart',
    reducer,
    {
      cart: [],
    },
  );

  const handleProductAdd = (product: Product) =>
    dispatch({ type: 'addProduct', payload: { product } });

  const handleProductRemove = (id: string) =>
    dispatch({ type: 'removeProduct', payload: { id } });

  const handleQuantityIncrement = (id: string) =>
    dispatch({ type: 'incrementQuantity', payload: { id } });

  const handleQuantityDecrement = (id: string) =>
    dispatch({ type: 'decrementQuantity', payload: { id } });

  const handleCartClear = () => {
    dispatch({ type: 'clearCart' });
  };

  const value = {
    cart: state.cart,
    handleProductAdd,
    handleProductRemove,
    handleQuantityIncrement,
    handleQuantityDecrement,
    handleCartClear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error('CartProvider is missing!!!');
  }

  return value;
};
