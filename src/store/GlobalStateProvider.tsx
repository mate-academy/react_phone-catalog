import { createContext, useReducer } from 'react';
import { AccessorySpecs } from '../types/AccessorySpecs';
import { States } from '../types/State';
import { PhoneSpecs } from '../types/PhoneSpecs';
import { TabletSpecs } from '../types/TabletSpecs';
import { ProductSummary } from '../types/ProductSummary';
import { Category } from '../types/Category';
import { getLocalStorage } from '../utils/getLocalStorage';

const initialStates = {
  accessories: [],
  phones: [],
  products: [],
  tablets: [],
  cart: getLocalStorage('cart', []),
  favorites: getLocalStorage('favs', []),
  categories: [],
  isMenuOpen: false,
  isReady: false,
};

type Action =
  | { type: 'loadAccessories'; payload: AccessorySpecs[] }
  | { type: 'loadPhones'; payload: PhoneSpecs[] }
  | { type: 'loadTablets'; payload: TabletSpecs[] }
  | { type: 'loadProducts'; payload: ProductSummary[] }
  | { type: 'loadCategories'; payload: Category[] }
  | { type: 'updateCart'; payload: ProductSummary[] }
  | { type: 'updateFavorites'; payload: ProductSummary[] }
  | { type: 'isMenuOpen'; payload: boolean }
  | { type: 'isReady'; payload: boolean };

type DispatchContextType = {
  (action: Action): void;
};
function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

  switch (action.type) {
    case 'loadAccessories':
      newStates = { ...newStates, accessories: action.payload };
      break;
    case 'loadPhones':
      newStates = { ...newStates, phones: action.payload };
      break;
    case 'loadTablets':
      newStates = { ...newStates, tablets: action.payload };
      break;
    case 'loadProducts':
      newStates = { ...newStates, products: action.payload };
      break;
    case 'loadCategories':
      newStates = { ...newStates, categories: action.payload };
      break;
    case 'updateCart':
      newStates = { ...newStates, cart: action.payload };
      break;
    case 'updateFavorites':
      newStates = { ...newStates, favorites: action.payload };
      break;
    case 'isMenuOpen':
      newStates = { ...newStates, isMenuOpen: action.payload };
      break;
    case 'isReady':
      newStates = { ...newStates, isReady: action.payload };
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
