import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  priceRegular: number;
  priceDiscount: ReactNode;
  screen: string;
  capacity: string;
  ram: string;
  images: string[];
  imageUrl: string;
}

interface CartState {
  cart: Product[];
  favorites: Product[];
}

type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'TOGGLE_FAVORITE'; product: Product }
  | { type: 'INCREASE_QUANTITY'; productId: string }
  | { type: 'DECREASE_QUANTITY'; productId: string };

const initialState: CartState = {
  cart: [],
  favorites: [],
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.cart.find(p => p.id === action.product.id)) {
        return {
          ...state,
          cart: state.cart.filter(p => p.id !== action.product.id),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(p => p.id !== action.productId),
      };

    case 'TOGGLE_FAVORITE':
      if (state.favorites.find(p => p.id === action.product.id)) {
        return {
          ...state,
          favorites: state.favorites.filter(p => p.id !== action.product.id),
        };
      }

      return { ...state, favorites: [...state.favorites, action.product] };

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.productId
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product,
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.productId && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      };
    }

    default:
      return state;
  }
};

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<Action>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedFavorites = localStorage.getItem('favorites');

    if (storedCart) {
      const cartProducts: Product[] = JSON.parse(storedCart);

      cartProducts.forEach(product =>
        dispatch({ type: 'ADD_TO_CART', product }),
      );
    }

    if (storedFavorites) {
      const favoriteProducts: Product[] = JSON.parse(storedFavorites);

      favoriteProducts.forEach(product =>
        dispatch({ type: 'TOGGLE_FAVORITE', product }),
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.cart, state.favorites]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
