import { useEffect, useReducer } from 'react';
import React from 'react';
import { ProductDetails } from '../../types';
import { getPhones } from '../../services/phonesApi';

type PhonesAction =
  | { type: 'load' }
  | { type: 'success'; payload: ProductDetails[] }
  | { type: 'error'; payload: string };

interface State {
  phones: ProductDetails[];
  loading: boolean;
  error: string | null;
}

const reducer = (state: State, action: PhonesAction): State => {
  switch (action.type) {
    case 'load':
      return { ...state, loading: true };

    case 'success':
      return { phones: action.payload, loading: false, error: null };

    case 'error':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initalState: State = {
  phones: [],
  loading: false,
  error: null,
};

export const PhonesContext = React.createContext(initalState);

type Props = {
  children: React.ReactNode;
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const loadPhones = async () => {
      dispatch({ type: 'load' });

      try {
        const data = await getPhones();

        dispatch({ type: 'success', payload: data });
      } catch {
        dispatch({ type: 'error', payload: 'Failed to load phones' });
      }
    };

    loadPhones();
  }, []);

  return (
    <PhonesContext.Provider value={state}>{children}</PhonesContext.Provider>
  );
};
