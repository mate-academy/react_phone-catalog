import { ProductDetails } from '@/types/ProductDetails';
import { ProductDetailsState } from '@/types/ProductDetailsState';

type ProductDetailsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProductDetails | null }
  | { type: 'FETCH_ERROR' };

export const productDetailsActionInitialState: ProductDetailsState = {
  product: null,
  isLoading: true,
  hasError: false,
};

export const productDetailsReducer = (
  state: ProductDetailsState,
  action: ProductDetailsAction,
): ProductDetailsState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, hasError: false };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, product: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};
