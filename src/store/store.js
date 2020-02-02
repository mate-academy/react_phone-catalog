import {createStore} from "redux";
import {SET_PHONES, SET_PHONES_TO_CART, SET_SEARCH_PHONES} from "./actions/actions";

const initialState = {
  phones: [],
  isLoading: true,
  phonesInCart: [],
  phoneDetails: [],
  foundPhones: [],
}

export function reducer(state = initialState, action) {
  switch(action.type){
    case SET_PHONES:
      return {
        ...state,
        phones: action.payload
      }
    case SET_PHONES_TO_CART:
      return {
        ...state,
        phonesInCart: [...state.phonesInCart, action.payload]
      }
    case SET_SEARCH_PHONES:
      return {
        ...state,
        foundPhones: action.payload
      }
  }
  return state
}

export const state = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


