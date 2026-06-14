import { Product } from '../shared/types';
import { ShoppingCartContextActionType } from './ShoppingCartContextActionType';

export type ShoppingCartContextAction =
  | { type: ShoppingCartContextActionType.ADD_TO_CART; payload: Product }
  | { type: ShoppingCartContextActionType.REMOVE_FROM_CART; payload: Product }
  | { type: ShoppingCartContextActionType.CLEAR_CART }
  | { type: ShoppingCartContextActionType.INCREASE_QUANTITY; payload: Product }
  | { type: ShoppingCartContextActionType.DECREASE_QUANTITY; payload: Product }
  | { type: ShoppingCartContextActionType.ADD_PRODUCTS };
