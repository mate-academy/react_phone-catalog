import { createContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { LikedReducer } from './reducers';
import { LikedAction } from '../types/Actions';

let initialState: Product[] = [];

try {
  const data = localStorage.getItem('liked');

  if (data !== null) {
    initialState = JSON.parse(data);
  }
} catch {
  throw new Error();
}

export const LikedContext = createContext(initialState);
export const DispatchLikedContext = createContext<React.Dispatch<LikedAction>>(
  () => null,
);

type Props = {
  children: React.ReactNode;
};

export const LikedStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(LikedReducer, initialState);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchLikedContext.Provider value={dispatch}>
      <LikedContext.Provider value={state}>{children}</LikedContext.Provider>
    </DispatchLikedContext.Provider>
  );
};
