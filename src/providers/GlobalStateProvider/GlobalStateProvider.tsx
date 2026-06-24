import React, { PropsWithChildren, useReducer } from "react";
import { Product } from "../../types/types";
import {
  getCartIds,
  getFavoritesIds,
  getProducts,
  saveCartIds,
  saveFavoritesIds,
} from "../../utils";

interface State {
  allProducts: Array<Product>;
  cartIds: Array<{ id: number; count: number }>;
  favoriteIds: Array<{ id: number; count: number }>;
  isLoading: boolean;
}

type Action =
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "ADD_CARD"; payload: number }
  | { type: "REMOVE_CARD"; payload: number }
  | { type: "START_LOADING" }
  | { type: "FINISH_LOADING" }
  | { type: "SAVE_DATA"; payload: Array<Product> }
  | { type: "REMOVE_ONE"; payload: number };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FINISH_LOADING": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "SAVE_DATA": {
      return {
        ...state,
        allProducts: action.payload,
      };
    }

    case "ADD_CARD": {
      const found = state.cartIds.find(obj => obj.id === action.payload);
      const stateCopy = {
        ...state,
        cartIds: [
          ...state.cartIds.filter(obj => obj.id !== action.payload),
          { id: action.payload, count: found ? found.count + 1 : 1 },
        ],
      };

      saveCartIds(stateCopy.cartIds);

      return stateCopy;
    }

    case "REMOVE_CARD": {
      const stateCopy = {
        ...state,
        cartIds: state.cartIds.filter(obj => obj.id !== action.payload),
      };

      saveCartIds(stateCopy.cartIds);

      return stateCopy;
    }

    case "REMOVE_ONE": {
      const found = state.cartIds.find(obj => obj.id === action.payload);

      if (!found) {
        return state;
      }

      let stateCopy = {
        ...state,
        cartIds: [
          ...state.cartIds.filter(obj => obj.id !== action.payload),
          { ...found, count: found.count ? found.count - 1 : 0 },
        ],
      };

      if (found.count - 1 < 1) {
        stateCopy = {
          ...stateCopy,
          cartIds: [
            ...stateCopy.cartIds.filter(obj => obj.id !== action.payload),
          ],
        };
      }

      saveCartIds(stateCopy.cartIds);

      return stateCopy;
    }

    case "ADD_FAVORITE": {
      const stateCopy = {
        ...state,
        favoriteIds: [...state.favoriteIds, { id: action.payload, count: 1 }],
      };

      saveFavoritesIds(stateCopy.favoriteIds);

      return stateCopy;
    }

    case "REMOVE_FAVORITE": {
      const stateCopy = {
        ...state,
        favoriteIds: state.favoriteIds.filter(obj => obj.id !== action.payload),
      };

      saveFavoritesIds(stateCopy.favoriteIds);

      return stateCopy;
    }

    default:
      return state;
  }
}

const initialState: State = {
  allProducts: getProducts(),
  cartIds: getCartIds(),
  favoriteIds: getFavoritesIds(),
  isLoading: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => undefined,
);

export const GlobalStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
