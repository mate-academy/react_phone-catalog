import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { appReducer as reducer } from './reducer';
import { State } from '../types/State';
import { InitialContext } from '../types/InitialContext';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';
import { getProduct, getProducts } from '../services/api';
import { Category } from '../types/Category';

const initialState: State = {
  isLoading: false,
  products: [],
  selectedProduct: null,
  cart: [],
  favourites: [],
  isError: '',
};

const init: InitialContext = {
  state: initialState,
  methods: {
    setProducts: () => new Promise(() => {}),
    setSelectedProduct: () => new Promise(() => {}),
    setCart: () => {},
    setFavourites: () => {},
    setError: () => {},
    setLoading: () => {},
    addProductToCart: () => {},
    addProductToFavourites: () => {},
    removeProductFromCart: () => {},
    removeProductFromFavourites: () => {},
    handleIncrement: () => {},
    handleDecrement: () => {},
    handleClearCart: () => {},
  },
};

const AppContext = createContext<InitialContext>(init);

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (value: boolean) => {
    dispatch({ type: 'setLoading', payload: value });
  };

  const setError = (value: string) => {
    dispatch({ type: 'setError', payload: value });
  };

  const setProducts = useCallback(async () => {
    setLoading(true);
    try {
      const products = await getProducts();

      dispatch({ type: 'setProducts', payload: products });
    } catch (error) {
      setError('Failed to fetch products');
      // console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setSelectedProduct = useCallback(
    async (category: Category, id: string) => {
      setLoading(true);
      try {
        const product = await getProduct(category, id);

        dispatch({ type: 'setSelectedProduct', payload: product });
      } catch (error) {
        setError('Failed to fetch product');
        // console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const setCart = (cart: CartItem[]) => {
    dispatch({ type: 'setCart', payload: cart });
  };

  const setFavourites = (favourites: Product[]) => {
    dispatch({ type: 'setFavourites', payload: favourites });
  };

  const addProductToCart = (newCartProduct: CartItem) => {
    dispatch({ type: 'addProductToCart', payload: newCartProduct });
  };

  const addProductToFavourites = (product: Product) => {
    dispatch({ type: 'addProductToFavourites', payload: product });
  };

  const removeProductFromCart = (id: string) => {
    dispatch({ type: 'removeProductFromCart', payload: id });
  };

  const removeProductFromFavourites = (id: number) => {
    dispatch({ type: 'removeProductFromFavourites', payload: id });
  };

  const handleIncrement = (item: CartItem) => {
    dispatch({ type: 'incrementCartItem', payload: item.id });
  };

  const handleDecrement = (item: CartItem) => {
    dispatch({ type: 'decrementCartItem', payload: item.id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'clearCart' });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedFavourites = localStorage.getItem('favourites');

    if (storedCart && storedCart !== 'undefined') {
      setCart(JSON.parse(storedCart));
    }

    if (storedFavourites && storedFavourites !== 'undefined') {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  useEffect(() => {
    setProducts();
  }, [setProducts]);

  const methods = {
    setProducts,
    setSelectedProduct,
    setCart,
    setFavourites,
    setError,
    setLoading,
    addProductToCart,
    addProductToFavourites,
    removeProductFromCart,
    removeProductFromFavourites,
    handleIncrement,
    handleDecrement,
    handleClearCart,
  };

  const value: InitialContext = { state, methods };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
