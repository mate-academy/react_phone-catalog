import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../types/Product';
import { PerPageOption, SortOrder } from '../types/Sort';
import { getProducts } from '../api/products';
import { CartProducts } from '../types/CartProduct';

interface Props {
  children: ReactNode;
}

type State = {
  products: Product[];
  errorMessage: string;
  cart: CartProducts[];
  favorites: Product[];
  page: number;
  perPage: PerPageOption;
  isLoading: boolean;
  sortOrder: SortOrder;
};

type ProductsContextType = State & {
  setProducts: (payload: Product[]) => void;
  setErrorMessage: (payload: string) => void;
  setPage: (payload: number) => void;
  setPerPage: (payload: PerPageOption) => void;
  setLoading: (payload: boolean) => void;
  setOrder: (payload: SortOrder) => void;
  SetAddToCart: (product: CartProducts) => void;
  SetRemoveFromCart: (id: string) => void;
  SetUpdateQuantity: (id: string, quantity: number) => void;
  SetAddToFavorites: (product: Product) => void;
  SetRemoveFromFavorites: (id: string) => void;
  SetClearCart: () => void;
};

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_ERROR_MESSAGE'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PER_PAGE'; payload: PerPageOption }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ORDER'; payload: SortOrder }
  | { type: 'SET_ADD_TO_CART'; product: CartProducts }
  | { type: 'SET_REMOVE_FROM_CART'; id: string }
  | { type: 'SET_UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'SET_ADD_TO_FAVORITES'; product: Product }
  | { type: 'SET_REMOVE_FROM_FAVORITES'; id: string }
  | { type: 'SET_CLEAR_CART' };

export const ProductsContext = createContext<ProductsContextType>({
  cart: [],
  products: [],
  favorites: [],
  errorMessage: '',
  page: 1,
  perPage: PerPageOption.Four,
  isLoading: false,
  sortOrder: SortOrder.Newest,
  setProducts: () => {},
  setErrorMessage: () => {},
  setPage: () => {},
  setPerPage: () => {},
  setLoading: () => {},
  setOrder: () => {},
  SetAddToCart: () => {},
  SetRemoveFromCart: () => {},
  SetUpdateQuantity: () => {},
  SetAddToFavorites: () => {},
  SetRemoveFromFavorites: () => {},
  SetClearCart: () => {},
});

const initialState: State = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  products: [],
  errorMessage: '',
  page: 1,
  perPage: PerPageOption.Four,
  isLoading: false,
  sortOrder: SortOrder.Newest,
};

const productsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_ORDER':
      return { ...state, sortOrder: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_PER_PAGE':
      return { ...state, perPage: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CLEAR_CART': {
      localStorage.setItem('cart', JSON.stringify([]));
      return { ...state, cart: [] };
    }
    case 'SET_ADD_TO_CART': {
      const productExists = state.cart.find(
        item => item.id === action.product.id,
      );

      if (productExists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      const updatedCart = [...state.cart, { ...action.product, quantity: 1 }];

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart };
    }

    case 'SET_REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter(item => item.id !== action.id);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart };
    }

    case 'SET_UPDATE_QUANTITY': {
      const updatedCart = state.cart.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item,
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart };
    }

    case 'SET_ADD_TO_FAVORITES': {
      const isAlreadyFavorite = state.favorites.some(
        item => item.id === action.product.id,
      );

      if (isAlreadyFavorite) {
        return state;
      }

      const updatedFavorites = [...state.favorites, action.product];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return { ...state, favorites: updatedFavorites };
    }

    case 'SET_REMOVE_FROM_FAVORITES': {
      const updatedFavorites = state.favorites.filter(
        item => item.id !== action.id,
      );

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return { ...state, favorites: updatedFavorites };
    }

    default:
      return state;
  }
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const setProducts = (newProducts: Product[]) => {
    dispatch({ type: 'SET_PRODUCTS', payload: newProducts });
  };

  const setErrorMessage = (newErrorMessage: string) => {
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: newErrorMessage });
  };

  const setPage = (newPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };

  const setPerPage = (newPerPage: PerPageOption) => {
    dispatch({ type: 'SET_PER_PAGE', payload: newPerPage });
  };

  const setLoading = (newIsLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: newIsLoading });
  };

  const setOrder = (newSort: SortOrder) => {
    dispatch({ type: 'SET_ORDER', payload: newSort });
  };

  const SetClearCart = () => {
    dispatch({ type: 'SET_CLEAR_CART' });
  };

  const SetAddToCart = (product: CartProducts) => {
    dispatch({ type: 'SET_ADD_TO_CART', product });
  };

  const SetRemoveFromCart = (id: string) => {
    dispatch({ type: 'SET_REMOVE_FROM_CART', id });
  };

  const SetUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'SET_UPDATE_QUANTITY', id, quantity });
  };

  const SetAddToFavorites = (product: Product) => {
    dispatch({ type: 'SET_ADD_TO_FAVORITES', product });
  };

  const SetRemoveFromFavorites = (id: string) => {
    dispatch({ type: 'SET_REMOVE_FROM_FAVORITES', id });
  };

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setProducts,
      setErrorMessage,
      setPage,
      setPerPage,
      setLoading,
      setOrder,
      SetAddToCart,
      SetRemoveFromCart,
      SetUpdateQuantity,
      SetAddToFavorites,
      SetRemoveFromFavorites,
      SetClearCart,
    }),
    [state],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
