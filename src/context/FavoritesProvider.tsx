import React, { useEffect } from 'react';
import { Product } from '../shared/types';
import { FavoritesContextAction } from './FavoritesContextAction';
import { FavoritesContextActionType } from './FavoritesContextActionType';
import * as productService from '../api/product';

type Props = { children: React.ReactNode };

const initialState = {
  products: [],
};

type RootState = {
  products: Product[];
};

const StateContext = React.createContext<RootState>(initialState);

type Dispatch = React.Dispatch<FavoritesContextAction>;
const DispatchContext = React.createContext<Dispatch>(() => {});

export const useFavoritesDispatch = () => React.useContext(DispatchContext);
export const useFavoritesStateValue = () => React.useContext(StateContext);

const reducer = (state: RootState, action: FavoritesContextAction) => {
  switch (action.type) {
    case FavoritesContextActionType.TOGGLE_FAVORITE: {
      const product = action.payload;
      const isPresentInState = state.products.includes(product);
      const newProducts = [];

      if (isPresentInState) {
        newProducts.push(...state.products.filter(p => p.id !== product.id));
        productService.removeProductFromFavorites(product.id);
      } else {
        newProducts.push(...state.products, product);
        productService.saveProductToFavorites(product);
      }

      return {
        products: [...newProducts],
      };
    }

    case FavoritesContextActionType.ADD_FAVORITES: {
      const products = action.payload;

      return {
        products: products,
      };
    }
  }
};

export const FavoritesProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const products = productService.getFavorites();

    if (!products.length) {
      return;
    }

    dispatch({
      type: FavoritesContextActionType.ADD_FAVORITES,
      payload: products,
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
