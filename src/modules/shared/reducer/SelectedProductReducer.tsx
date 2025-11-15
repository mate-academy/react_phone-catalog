import { createContext, useReducer } from 'react';
import { ProductDetails } from '../types/ProductDetails';

type State = {
  product: ProductDetails | null;
  loader: boolean;
  error: string;
  alarm: string;
};

const initState: State = {
  product: null,
  loader: false,
  error: '',
  alarm: '',
};

type Action =
  | { type: 'setProduct'; payload: ProductDetails | null }
  | { type: 'loader'; payload: boolean }
  | { type: 'error'; payload: string }
  | { type: 'alarm'; payload: string };

const reducer = (selectedProductState: State, action: Action): State => {
  switch (action.type) {
    case 'setProduct':
      return {
        ...selectedProductState,
        product: action.payload,
      };

    case 'loader':
      return {
        ...selectedProductState,
        loader: action.payload,
      };
    case 'error':
      return {
        ...selectedProductState,
        error: action.payload,
      };
    case 'alarm':
      return {
        ...selectedProductState,
        alarm: action.payload,
      };
    default:
      return initState;
  }
};

export const SelectedProductState = createContext<State>(initState);
// eslint-disable-next-line prettier/prettier
export const SelectedProductDispatch = createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProductDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedProductState, selectedProductDispatch] = useReducer(
    reducer,
    initState,
  );

  return (
    <SelectedProductDispatch.Provider value={selectedProductDispatch}>
      <SelectedProductState.Provider value={selectedProductState}>
        {children}
      </SelectedProductState.Provider>
    </SelectedProductDispatch.Provider>
  );
};
