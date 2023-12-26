import { Product } from '../types/Product';

type AddAction = { type: 'cart/ADD'; payload: Product };
type TakeAction = { type: 'cart/TAKE'; payload: Product };
type RemoveAction = { type: 'cart/REMOVE'; payload: Product };
type ClearAction = { type: 'cart/CLEAR' };

type Action = AddAction | TakeAction | ClearAction | RemoveAction;
export type CartItem = {
  product: Product,
  quantity: number,
};

const add = (
  value: Product,
): AddAction => ({ type: 'cart/ADD', payload: value });
const take = (
  value: Product,
): TakeAction => ({ type: 'cart/TAKE', payload: value });
const remove = (
  value: Product,
): RemoveAction => ({ type: 'cart/REMOVE', payload: value });
const clear = (): ClearAction => ({ type: 'cart/CLEAR' });

const cartReducer = (
  cart: CartItem[] = [],
  action: Action,
): CartItem[] => {
  switch (action.type) {
    case 'cart/ADD': {
      const productIndx = cart.findIndex(
        item => item.product.itemId === action.payload.itemId,
      );

      if (productIndx === -1) {
        return [...cart, {
          product: action.payload,
          quantity: 1,
        }];
      }

      return [
        ...cart.slice(0, productIndx),
        {
          product: action.payload,
          quantity: cart[productIndx].quantity + 1,
        },
        ...cart.slice(productIndx + 1),
      ];
    }

    case 'cart/TAKE': {
      const productIndx = cart.findIndex(
        item => item.product.itemId === action.payload.itemId,
      );

      if (productIndx === -1) {
        return cart;
      }

      const newQuantity = cart[productIndx].quantity - 1;

      if (newQuantity <= 0) {
        return [
          ...cart.slice(0, productIndx),
          ...cart.slice(productIndx + 1),
        ];
      }

      return [
        ...cart.slice(0, productIndx),
        {
          product: action.payload,
          quantity: newQuantity,
        },
        ...cart.slice(productIndx + 1),
      ];
    }

    case 'cart/REMOVE': {
      return cart.filter(item => item.product.itemId !== action.payload.itemId);
    }

    case 'cart/CLEAR': {
      return [];
    }

    default: {
      return cart;
    }
  }
};

export const actions = {
  add, take, remove, clear,
};
export default cartReducer;
