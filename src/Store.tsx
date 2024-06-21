import { useReducer, createContext } from 'react';
import { Phone } from './types/Phone';
import { Product } from './types/Product';

export type Action =
  | { type: 'setPhones'; payload: Phone[] }
  | { type: 'setProducts'; payload: Product[] };

export type State = {
  phones: Phone[];
  products: Product[];
};

const initialState: State = {
  phones: [],
  products: [],
};

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setPhones':
      return {
        ...state,
        phones: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
