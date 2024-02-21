/* eslint-disable */
import { Dispatch, useEffect, useReducer } from "react";
import { ACTIONS } from "./helpers/utils";
import React from "react";
import { Product } from "./types";
import axios from "axios";

type Action = { type: ACTIONS.SET_ITEMS_PER_PAGE, payload: number }
  | { type: ACTIONS.SET_FAVOUTITES, payload: Product }
  | { type: ACTIONS.SET_PRODUCTS, payload: Product[] }
  | { type: ACTIONS.ADD_TO_CARD, payload: Product }
  | { type: ACTIONS.DELETE_FROM_CARD, payload: Product }
  | { type: ACTIONS.DELETE_FROM_FAVOURITES, payload: Product }

interface Data {
  itemsPerPage: number,
  favourites: Array<Product>
  products: Array<Product>
  card: Product[],
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
      return {
        ...state,
        card: [...state.card, action.payload],
      }
    }
    case ACTIONS.DELETE_FROM_CARD: {
      const indexElement = state.card.indexOf(action.payload);
      
      const copy = [...state.card];
      
      copy.splice(indexElement, 1);
      
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
    itemsPerPage: 16,
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

  return (
    <StateContext.Provider value={{
      state: {
        ...state,
        itemsPerPage: state.itemsPerPage,
      },
      dispatch,
    }}>
      {children}
    </StateContext.Provider>
  )
}
