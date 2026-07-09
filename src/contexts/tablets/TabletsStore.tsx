import { useEffect, useReducer } from 'react';
import React from 'react';
import { getTablets } from '../../services/tabletsApi';
import { ProductDetails } from '../../types';

type TabletsAction =
  | { type: 'load' }
  | { type: 'success'; payload: ProductDetails[] }
  | { type: 'error'; payload: string };

interface State {
  tablets: ProductDetails[];
  loading: boolean;
  error: string | null;
}

const reducer = (state: State, action: TabletsAction): State => {
  switch (action.type) {
    case 'load':
      return { ...state, loading: true };

    case 'success':
      return { tablets: action.payload, loading: false, error: null };

    case 'error':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initialState: State = {
  tablets: [],
  loading: false,
  error: null,
};

export const TabletsContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const TabletsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadTablets = async () => {
      dispatch({ type: 'load' });

      try {
        const data = await getTablets();

        dispatch({ type: 'success', payload: data });
      } catch {
        dispatch({ type: 'error', payload: 'Failed to load tablets' });
      }
    };

    loadTablets();
  }, []);

  return (
    <TabletsContext.Provider value={state}>{children}</TabletsContext.Provider>
  );
};
