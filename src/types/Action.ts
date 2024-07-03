import { ActionTypes } from './ActionTypes';
import { Details } from './Details';
import { Product } from './Product';

export type Action =
  | { type: ActionTypes.SetBrandNewModels }
  | { type: ActionTypes.SetHotPrices }
  | { type: ActionTypes.SetProducts; payload: Product[] }
  | { type: ActionTypes.SetPhones; payload: Details[] }
  | { type: ActionTypes.SetTablets; payload: Details[] }
  | { type: ActionTypes.SetAccessories; payload: Details[] }
  | { type: ActionTypes.AddToFavourites; payload: { id: string } }
  | { type: ActionTypes.AddToCart; payload: { id: string } }
  | { type: ActionTypes.RemoveFromCart; payload: { id: string } }
  | { type: ActionTypes.PlusOneItem; payload: { id: string } }
  | { type: ActionTypes.MinusOneItem; payload: { id: string } }
  | { type: ActionTypes.AddSelectedProduct; payload: Details }
  | { type: ActionTypes.SetIsLoading; payload: { value: boolean } }
  | { type: ActionTypes.ClearCart }
  | { type: ActionTypes.SetCart; payload: Product[] }
  | { type: ActionTypes.SetFavourites; payload: Product[] }
  | { type: ActionTypes.FindProduct; payload: { path: string; value: string } }
  | { type: ActionTypes.RemoveFromfavourite; payload: { id: string } }
  | { type: ActionTypes.SetMenu; payload: { value: boolean } };
