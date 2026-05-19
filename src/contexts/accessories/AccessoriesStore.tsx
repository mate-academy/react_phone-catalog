import { useEffect, useReducer } from 'react';
import React from 'react';
import { getAccessories } from '../../services/accessoriesApi';
import { ProductDetails } from '../../types';

type AccessoriesAction =
  | { type: 'load' }
  | { type: 'success'; payload: ProductDetails[] }
  | { type: 'error'; payload: string };

interface State {
  accessories: ProductDetails[];
  loading: boolean;
  error: string | null;
}

const reducer = (state: State, action: AccessoriesAction): State => {
  switch (action.type) {
    case 'load':
      return { ...state, loading: true };

    case 'success':
      return { accessories: action.payload, loading: false, error: null };

    case 'error':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initialState: State = {
  accessories: [],
  loading: false,
  error: null,
};

export const AccessoriesContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const AccessoriesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadAccessories = async () => {
      dispatch({ type: 'load' });

      try {
        const data = await getAccessories();

        dispatch({ type: 'success', payload: data });
      } catch {
        dispatch({ type: 'error', payload: 'Failed to load accessories' });
      }
    };

    loadAccessories();
  }, []);

  return (
    <AccessoriesContext.Provider value={state}>
      {children}
    </AccessoriesContext.Provider>
  );
};
