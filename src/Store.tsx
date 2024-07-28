import { useReducer, createContext } from 'react';
import { Product } from './types/Product';

export type Action =
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'addToFavorites'; payload: { itemId: string } }
  | { type: 'removeFromFavorites'; payload: { itemId: string } }
  | { type: 'addToBascket'; payload: { itemId: string; price: number } }
  | { type: 'removeFromBascket'; payload: { itemId: string } }
  | { type: 'removeAllFromBascket'; payload: { itemId: string } }
  | { type: 'deleteOneItem'; payload: { itemId: string; quantity: number } }
  | { type: 'addOneItem'; payload: { itemId: string; quantity: number } }
  | { type: 'setBascketItem'; payload: { itemId: string; quantity: number } };

export type State = {
  products: Product[];
  favorites: string[];
  bascket: { itemId: string; quantity: number; price: number }[];
};

const FAVORITES_GOODS = 'FAVORITES_GOODS';
const BASCKET = 'BASCKET';

const favoritesArr = localStorage.getItem(FAVORITES_GOODS);
const bascketArr = localStorage.getItem(BASCKET);

const initialState: State = {
  products: [],
  favorites: favoritesArr === null ? [] : JSON.parse(favoritesArr),
  bascket: bascketArr === null ? [] : JSON.parse(bascketArr),
};

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };

    case 'addToFavorites': {
      const newState = {
        ...state,
        favorites: [...state.favorites, action.payload.itemId],
      };

      localStorage.setItem(FAVORITES_GOODS, JSON.stringify(newState.favorites));

      return newState;
    }

    case 'removeFromFavorites': {
      const newState = {
        ...state,
        favorites: state.favorites.filter(
          item => item !== action.payload.itemId,
        ),
      };

      localStorage.setItem(FAVORITES_GOODS, JSON.stringify(newState.favorites));

      return newState;
    }

    case 'addToBascket': {
      let bascket = [];

      const index = state.bascket.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (index === -1) {
        bascket = [
          ...state.bascket,
          {
            itemId: action.payload.itemId,
            quantity: 1,
            price: action.payload.price,
          },
        ];
      } else {
        bascket = [...state.bascket];
        bascket[index] = {
          itemId: action.payload.itemId,
          quantity: bascket[index].quantity + 1,
          price: action.payload.price,
        };
      }

      const newState = {
        ...state,
        bascket,
      };

      localStorage.setItem(BASCKET, JSON.stringify(newState.bascket));

      return newState;
    }

    case 'removeFromBascket': {
      const newState = {
        ...state,
        bascket: state.bascket.filter(
          item => item.itemId !== action.payload.itemId,
        ),
      };

      localStorage.setItem(BASCKET, JSON.stringify(newState.bascket));

      return newState;
    }

    case 'removeAllFromBascket': {
      const newState = {
        ...state,
        bascket: state.bascket.filter(
          item => item.itemId !== action.payload.itemId,
        ),
      };

      localStorage.setItem(BASCKET, JSON.stringify(newState.bascket));

      return newState;
    }

    case 'deleteOneItem': {
      let bascket = [];

      const index = state.bascket.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      const item = state.bascket.find(
        el => el.itemId === action.payload.itemId,
      );

      if (item?.quantity === 1) {
        bascket = state.bascket.filter(
          el => el.itemId !== action.payload.itemId,
        );
      } else {
        bascket = [...state.bascket];
        bascket[index] = {
          ...bascket[index],
          itemId: action.payload.itemId,
          quantity: bascket[index].quantity - 1,
        };
      }

      const newState = {
        ...state,
        bascket,
      };

      localStorage.setItem(BASCKET, JSON.stringify(newState.bascket));

      return newState;
    }

    case 'addOneItem': {
      let bascket = [];

      bascket = [...state.bascket];

      const index = state.bascket.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      bascket[index] = {
        ...bascket[index],
        itemId: action.payload.itemId,
        quantity: bascket[index].quantity + 1,
      };

      const newState = {
        ...state,
        bascket,
      };

      localStorage.setItem(BASCKET, JSON.stringify(newState.bascket));

      return newState;
    }

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
