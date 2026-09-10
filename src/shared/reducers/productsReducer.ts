import { Product } from '@/types/Product';
import { ProductsState } from '@/types/ProductsState';

type ProductsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR' };

export const productsInitialState: ProductsState = {
  products: [],
  isLoading: true,
  hasError: false,
};

export const productsReducer = (
  state: ProductsState,
  action: ProductsAction,
): ProductsState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, hasError: false };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, products: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};
