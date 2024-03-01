/* eslint-disable */
import { Dispatch, useEffect, useReducer } from "react";
import { ACTIONS } from "./helpers/utils";
import React from "react";
import { Product } from "./types";
import axios from "axios";
import { getAge } from "./helpers/utils";
import { useSearchParams } from "react-router-dom";

type Action = { type: ACTIONS.SET_ITEMS_PER_PAGE, payload: string }
  | { type: ACTIONS.SET_FAVOUTITES, payload: Product }
  | { type: ACTIONS.SET_PRODUCTS, payload: Product[] }
  | { type: ACTIONS.ADD_TO_CARD, payload: Product }
  | { type: ACTIONS.DELETE_FROM_CARD, payload: Product }
  | { type: ACTIONS.DELETE_FROM_FAVOURITES, payload: Product }

interface Data {
  itemsPerPage: string,
  favourites: Array<Product>
  products: Array<Product>
  // card: Array<{
  //   item: Product,
  //   amount: number,
  // }>,
  card: Product[],
}

function sortProducts(arrayToSort: Product[]) {
  const [searchParams,] = useSearchParams();

  const sortType = searchParams.get('sort') || '';
  let result = [...arrayToSort.sort(getAge)];

  switch (sortType) {
    case 'age':
    default: {
      result = arrayToSort.sort(getAge);
      console.log('sort');

      break;
    }
    case 'ageDesc': {
      result.reverse();
      break;
    }

  }

  return result;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case ACTIONS.SET_ITEMS_PER_PAGE: {
      return {
        ...state,
        itemsPerPage: action.payload,
      }
    }
    case ACTIONS.SET_FAVOUTITES: {
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      }
    }
    case ACTIONS.ADD_TO_CARD: {
      const oldCardData = JSON.parse(localStorage.getItem('cart') || '[{}]');


      localStorage.setItem("cart", JSON.stringify([...oldCardData, action.payload]));
      const cardData = JSON.parse(localStorage.getItem("cart") || '')

      return {
        ...state,
        card: cardData,
      }
    }
    case ACTIONS.DELETE_FROM_CARD: {
      const cardData = JSON.parse(localStorage.getItem("cart") || '');

      const copy = [...cardData];
      const indexElement = copy.findIndex(element => element.id === action.payload.id);

      if (indexElement !== -1) {
        copy.splice(indexElement, 1);
      }

      localStorage.setItem("cart", JSON.stringify(copy));

      return {
        ...state,
        card: copy,
      }
    }
    case ACTIONS.DELETE_FROM_FAVOURITES: {
      const indexElement = state.favourites.indexOf(action.payload);

      const copy = [...state.favourites];

      copy.splice(indexElement, 1);

      return {
        ...state,
        favourites: copy,
      }
    }
    case ACTIONS.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      }
    }
  }
}

type State = {
  state: Data,
  dispatch: Dispatch<Action>,
}

const initialState: State = {
  state: {
    itemsPerPage: '4',
    favourites: [],
    products: [],
    card: [],
  },
  dispatch: () => { },
}

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState.state);

  const apiUrl = 'http://localhost:3000/api'

  const client = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  })

  useEffect(() => {
    client.get('customProducts.json').then(resp => {
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: resp.data })
    })
  }, [])

  useEffect(() => {

  }, [])
  console.log(state.products, 'products in context');

  return (
    <StateContext.Provider value={{
      state: {
        ...state,
        products: sortProducts(state.products),
        card: JSON.parse(localStorage.getItem('cart') as string),
      },
      dispatch,
    }}>
      {children}
    </StateContext.Provider>
  )
}
