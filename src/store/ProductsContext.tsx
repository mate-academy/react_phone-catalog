import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../types/Product';
import apiClient from '../utils/httpClient';
import { SortOrder } from '../types/Sort';

interface Props {
  children: ReactNode;
}

type State = {
  products: Product[];
  errorMessage: string;
  page: number;
  perPage: number;
  totalCount: number;
  isLoading: boolean;
  sortOrder: SortOrder;
};

type ProductsContextType = State & {
  setProducts: (payload: Product[]) => void;
  setErrorMessage: (payload: string) => void;
  setPage: (payload: number) => void;
  setPerPage: (payload: number) => void;
  setTotalCount: (payload: number) => void;
  setLoading: (payload: boolean) => void;
  setOrder: (payload: SortOrder) => void;
};

type Action =
  | { type: 'SetProduct'; payload: Product[] }
  | { type: 'SetErrorMessage'; payload: string }
  | { type: 'SetPage'; payload: number }
  | { type: 'SetPerPage'; payload: number }
  | { type: 'SetTotalCount'; payload: number }
  | { type: 'SetLoading'; payload: boolean }
  | { type: 'SetOrder'; payload: SortOrder };

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  errorMessage: '',
  page: 1,
  perPage: 10,
  totalCount: 0,
  isLoading: false,
  sortOrder: SortOrder.Newest,
  setProducts: () => {},
  setErrorMessage: () => {},
  setPage: () => {},
  setPerPage: () => {},
  setTotalCount: () => {},
  setLoading: () => {},
  setOrder: () => {},
});

const initialState: State = {
  products: [],
  errorMessage: '',
  page: 1,
  perPage: 10,
  totalCount: 0,
  isLoading: false,
  sortOrder: SortOrder.Newest,
};

const productsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SetProduct':
      return { ...state, products: action.payload };
    case 'SetOrder':
      return { ...state, sortOrder: action.payload };
    case 'SetErrorMessage':
      return { ...state, errorMessage: action.payload };
    case 'SetPage':
      return { ...state, page: action.payload };
    case 'SetPerPage':
      return { ...state, perPage: action.payload };
    case 'SetTotalCount':
      return { ...state, totalCount: action.payload };
    case 'SetLoading':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [
    { products, errorMessage, page, perPage, totalCount, isLoading, sortOrder },
    dispatch,
  ] = useReducer(productsReducer, initialState);

  const setProducts = (newProducts: Product[]) => {
    dispatch({ type: 'SetProduct', payload: newProducts });
  };

  const setErrorMessage = (newErrorMessage: string) => {
    dispatch({ type: 'SetErrorMessage', payload: newErrorMessage });
  };

  const setPage = (newPage: number) => {
    dispatch({ type: 'SetPage', payload: newPage });
  };

  const setPerPage = (newPerPage: number) => {
    dispatch({ type: 'SetPerPage', payload: newPerPage });
  };

  const setTotalCount = (newTotalCount: number) => {
    dispatch({ type: 'SetTotalCount', payload: newTotalCount });
  };

  const setLoading = (newIsLoading: boolean) => {
    dispatch({ type: 'SetLoading', payload: newIsLoading });
  };

  const setOrder = (newSort: SortOrder) => {
    dispatch({ type: 'SetOrder', payload: newSort });
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>('/phones.json');

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Something went wrong');
        throw new Error('Error');
      }
    };

    fetchProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      errorMessage,
      page,
      perPage,
      totalCount,
      isLoading,
      sortOrder,
      setProducts,
      setErrorMessage,
      setPage,
      setPerPage,
      setTotalCount,
      setLoading,
      setOrder,
    }),
    [products, errorMessage, page, perPage, totalCount, isLoading, sortOrder],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
