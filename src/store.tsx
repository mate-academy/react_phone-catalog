import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { Action } from './types/Action';
import { State } from './types/State';
import { getProducts } from './components/ui/utils/api/api';
import { ActionTypes } from './types/ActionTypes';
import { Product } from './types/Product';

const initialState: State = {
  isMenuOpen: false,
  products: [],
  brandNewModels: [],
  hotPrices: [],
  phones: [],
  tablets: [],
  accessories: [],
  favourites: [],
  cart: [],
  selectedProduct: null,
  isLoading: false,
};
// eslint-disable-next-line @typescript-eslint/default-param-last
const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SetBrandNewModels:
      const theNewest = state.products.sort((a, b) => b.year - a.year);

      return {
        ...state,
        brandNewModels: [...theNewest],
      };

    case ActionTypes.SetHotPrices:
      return {
        ...state,
        hotPrices: state.products
          .filter(phone => phone.name.includes('iPhone 11 Pro Max'))
          .sort((a, b) => b.price - a.price),
      };

    case ActionTypes.SetProducts:
      return {
        ...state,
        products: [...action.payload],
      };
    case ActionTypes.SetPhones:
      return {
        ...state,
        phones: action.payload,
      };

    case ActionTypes.SetTablets:
      return {
        ...state,
        tablets: action.payload,
      };

    case ActionTypes.SetAccessories:
      return {
        ...state,
        accessories: action.payload,
      };

    case ActionTypes.AddToFavourites:
      return {
        ...state,
        favourites: [
          ...state.favourites,
          ...state.products.filter(elem => elem.itemId === action.payload.id),
        ],
      };

    case ActionTypes.RemoveFromfavourite:
      return {
        ...state,
        favourites: [
          ...state.favourites.filter(elem => elem.itemId !== action.payload.id),
        ],
      };

    case ActionTypes.AddToCart:
      const selectedProduct = state.products.filter(
        elem => elem.itemId === action.payload.id,
      );
      //set amount to 1 for next manipulations with amount of product in cart
      selectedProduct[0].amount = 1;

      return {
        ...state,
        cart: [...state.cart, ...selectedProduct],
      };

    case ActionTypes.RemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter(elem => elem.itemId !== action.payload.id),
      };

    case ActionTypes.PlusOneItem:
      const result = state.cart.map(elem => {
        if (elem.itemId === action.payload.id) {
          return {
            ...elem,
            amount: elem.amount + 1,
          };
        }

        return elem;
      });

      return {
        ...state,
        cart: [...result],
      };

    case ActionTypes.MinusOneItem:
      const resultArray = state.cart.map(elem => {
        if (elem.itemId === action.payload.id) {
          return {
            ...elem,
            amount: elem.amount - 1,
          };
        }

        return elem;
      });

      return {
        ...state,
        cart: [...resultArray],
      };

    case ActionTypes.AddSelectedProduct:
      return { ...state, selectedProduct: action.payload };

    case ActionTypes.SetIsLoading:
      // return { ...state, isLoading: action.value };
      return state;
    case ActionTypes.ClearCart:
      return { ...state, cart: [] };
    case ActionTypes.SetCart:
      return { ...state, cart: [...action.payload] };
    case ActionTypes.SetFavourites:
      return { ...state, favourites: [...action.payload] };
    case ActionTypes.FindProduct:
      return state;
    default:
      return state;
  }
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    dispatch({ type: ActionTypes.SetIsLoading, payload: { value: true } });

    getProducts()
      .then((data: Product[]) => {
        dispatch({ type: ActionTypes.SetProducts, payload: data });
        dispatch({ type: ActionTypes.SetBrandNewModels });
        dispatch({ type: ActionTypes.SetHotPrices });
      })
      .finally(() =>
        dispatch({ type: ActionTypes.SetIsLoading, payload: { value: false } }),
      );
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');

    if (cartData === null) {
      return;
    }

    try {
      dispatch({ type: ActionTypes.SetCart, payload: JSON.parse(cartData) });
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    const favData = localStorage.getItem('favourites');

    if (favData === null) {
      return;
    }

    try {
      dispatch({
        type: ActionTypes.SetFavourites,
        payload: JSON.parse(favData),
      });
    } catch (error) {
      return;
    }
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
