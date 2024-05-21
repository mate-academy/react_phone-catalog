import { State, Action } from '../types/State';

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'setError':
      return {
        ...state,
        isError: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    case 'setSelectedProduct':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case 'setCart':
      return {
        ...state,
        cart: action.payload,
      };
    case 'setFavourites':
      return {
        ...state,
        favourites: action.payload,
      };
    case 'addProductToCart':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'addProductToFavourites':
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case 'removeProductFromCart':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload),
      };
    case 'removeProductFromFavourites':
      return {
        ...state,
        favourites: state.favourites.filter(
          product => product.id !== action.payload,
        ),
      };
    case 'incrementCartItem':
      return {
        ...state,
        cart: state.cart.map(cartItem =>
          cartItem.id === action.payload
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        ),
      };
    case 'decrementCartItem':
      return {
        ...state,
        cart: state.cart.map(cartItem =>
          cartItem.id === action.payload && cartItem.count > 1
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem,
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
