import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { favoritesReducer } from "./favoritesReducer";
import { Card } from "../interfaces/Card";

export interface actionType {
  type: string;
  payload: string | Card[]
}

export const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
})