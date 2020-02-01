import {createStore} from "redux";
import {SET_PHONES, SET_PHONES_TO_CART, SET_PHONES_DETAILS} from "./actions/actions";

const initialState = {
  phones: [],
  isLoading: true,
  phonesInCart: [],
  phoneDetails: []
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
    case SET_PHONES_DETAILS:
      return {
        ...state,
        phonesInCart: action.payload
      }
  }
  return state
}

export const state = createStore(reducer)


