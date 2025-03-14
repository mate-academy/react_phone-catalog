/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useReducer } from 'react';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../shared/utils/httpClient';
import { Product } from '../shared/types/Product';
import { PhonesTablets } from '../shared/types/PhonesTablets';
import { Accessories } from '../shared/types/Accessories';

type Action =
  | {
      type: 'setData';
      payload: {
        products: Product[];
        phones: PhonesTablets[];
        tablets: PhonesTablets[];
        accessories: Accessories[];
      };
    }
  | { type: 'toggleFavourite'; payload: Product }
  | { type: 'toggleCart'; payload: Product };

interface State {
  products: Product[];
  phones: PhonesTablets[];
  tablets: PhonesTablets[];
  accessories: Accessories[];
  favourites: Product[];
  cart: Product[];
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'setData':
      return {
        ...state,
        products: action.payload.products,
        phones: action.payload.phones,
        tablets: action.payload.tablets,
        accessories: action.payload.accessories,
      };
    case 'toggleFavourite':
      return {
        ...state,
        favourites: state.favourites.includes(action.payload)
          ? state.favourites.filter(id => id !== action.payload)
          : [...state.favourites, action.payload],
      };
    case 'toggleCart':
      return {
        ...state,
        cart: state.cart.includes(action.payload)
          ? state.cart.filter(id => id !== action.payload)
          : [...state.cart, action.payload],
      };
    default:
      return state;
  }
}

const initialState: State = {
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  favourites: [],
  cart: [],
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          productsFromServer,
          phonesFromServer,
          tabletsFromServer,
          accessoriesFromServer,
        ] = await Promise.all([
          getProducts(),
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        dispatch({
          type: 'setData',
          payload: {
            products: productsFromServer,
            phones: phonesFromServer,
            tablets: tabletsFromServer,
            accessories: accessoriesFromServer,
          },
        });
      } catch (error) {
        throw error;
      }
    }

    loadData();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
