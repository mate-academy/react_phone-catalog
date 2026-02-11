import React, { useEffect, useReducer, useState } from 'react';

import { Products } from '../types/products';
import { getProductAll } from '../utils/fetchClient';

const startState: Products[] = [];

type InitialState = {
  favoritesList: Products[];
  shopList: Products[];
  favoritesCount: number;
  shopCount: number;
  productList: Products[];
};

type Action =
  | { type: 'delete'; payload: Products }
  | { type: 'clear' }
  | { type: 'toggleProduct'; payload: Products }
  | { type: 'add'; payload: Products }
  | { type: 'minus'; payload: Products };

const reducer = (state: Products[], action: Action) => {
  switch (action.type) {
    case 'toggleProduct':
      const esc = state.some(pr => pr.id === action.payload.id);

      return esc
        ? state.filter(br => br.id !== action.payload.id)
        : [...state, { ...action.payload, quantity: 1 }];

    case 'delete':
      return state.filter(pr => pr.id !== action.payload.id);

    case 'clear':
      return [];

    case 'add':
      return state.map(pr =>
        pr.id === action.payload.id ? { ...pr, quantity: pr.quantity + 1 } : pr,
      );

    case 'minus':
      return state.map(pr =>
        pr.id === action.payload.id ? { ...pr, quantity: pr.quantity - 1 } : pr,
      );

    default:
      return state;
  }
};

export const StateContext = React.createContext<InitialState>({
  favoritesList: startState,
  shopList: startState,
  favoritesCount: 0,
  shopCount: 0,
  productList: [],
});

export const DispatchFavorites = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const DispatchShop = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [productList, setProductList] = useState<Products[]>([]);

  useEffect(() => {
    getProductAll()
      .then(setProductList)
      .catch(() => new Error());
  }, []);

  const initialFromLocaleStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const [favoritesList, dispatchFavorites] = useReducer(
    reducer,
    startState,
    () => initialFromLocaleStorage('favorites'),
  );

  const [shopList, dispatchShop] = useReducer(reducer, startState, () =>
    initialFromLocaleStorage('shop'),
  );

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    } catch {}
  }, [favoritesList]);

  useEffect(() => {
    try {
      localStorage.setItem('shop', JSON.stringify(shopList));
    } catch {}
  }, [shopList]);

  const favoritesCount = favoritesList.length;
  const shopCount = shopList.reduce((count, a) => count + a.quantity, 0);

  return (
    <DispatchFavorites.Provider value={dispatchFavorites}>
      <DispatchShop.Provider value={dispatchShop}>
        <StateContext.Provider
          value={{
            favoritesList,
            shopList,
            favoritesCount,
            shopCount,
            productList,
          }}
        >
          {children}
        </StateContext.Provider>
      </DispatchShop.Provider>
    </DispatchFavorites.Provider>
  );
};
