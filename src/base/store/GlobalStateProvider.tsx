import { createContext, useReducer } from 'react';
import { States } from '../../types/State.js';
import { getLocalStorage } from '../../utils/getLocalStorage.js';
import { ProductSpecs } from '../../types/ProductSpecs.js';

const initialStates = {
  cart: getLocalStorage('cart', []),
  favorites: getLocalStorage('favs', []),
  isMenuOpen: false,
  isReady: false,
  totalCartItems: 0,
  selectedProduct: undefined as ProductSpecs | undefined,
};

type Action =
  | { type: 'updateCart'; payload: Product[] }
  | { type: 'updateTotalCartItems'; payload: number }
  | { type: 'updateFavorites'; payload: Product[] }
  | { type: 'increaseQuantity'; payload: string }
  | { type: 'decreaseQuantity'; payload: string }
  | { type: 'isMenuOpen'; payload: boolean }
  | { type: 'isReady'; payload: boolean }
  | { type: 'selectedProduct'; payload: ProductSpecs };

type DispatchContextType = {
  (action: Action): void;
};
function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

  switch (action.type) {
    case 'updateCart':
      newStates = { ...newStates, cart: action.payload };
      break;
    case 'updateTotalCartItems':
      newStates = { ...newStates, totalCartItems: action.payload };
      break;
    case 'updateFavorites':
      newStates = { ...newStates, favorites: action.payload };
      break;
    case 'increaseQuantity':
      newStates = {
        ...newStates,
        cart: states.cart.map(p =>
          p.id === action.payload
            ? { ...p, quantity: (p.quantity ?? 1) + 1 }
            : p,
        ),
      };
      break;
    case 'decreaseQuantity':
      newStates = {
        ...newStates,
        cart: states.cart.map(p =>
          p.id === action.payload
            ? { ...p, quantity: (p.quantity ?? 1) - 1 }
            : p,
        ),
      };
      break;
    case 'isMenuOpen':
      newStates = { ...newStates, isMenuOpen: action.payload };
      break;
    case 'isReady':
      newStates = { ...newStates, isReady: action.payload };
      break;
    case 'selectedProduct':
      newStates = { ...newStates, selectedProduct: action.payload };
      break;
    default:
      return states;
  }

  localStorage.setItem('favs', JSON.stringify(newStates.favorites));
  localStorage.setItem('cart', JSON.stringify(newStates.cart));

  return newStates;
}

export const StatesContext = createContext<States>(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
    </DispatchContext.Provider>
  );
};
