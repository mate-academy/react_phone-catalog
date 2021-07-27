import { ADD_FAVORITE_PRODUCT, DELETE_FAVORITE_PRODUCT } from "./types"
import {actionType} from './rootReducer'

const initialState = {
  favorites: (JSON.parse(localStorage.getItem('favorites') || '[]') || []) as string[],
}

export const favoritesReducer = (state = initialState, action: actionType) => {
  let newFavorites = [];

  switch(action.type) {
    case ADD_FAVORITE_PRODUCT:
      newFavorites = [...state.favorites, action.payload]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    case DELETE_FAVORITE_PRODUCT:
      newFavorites = [...state.favorites].filter((id) => id !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return {
        ...state,
        favorites: newFavorites
      }
  }
  return state
}


