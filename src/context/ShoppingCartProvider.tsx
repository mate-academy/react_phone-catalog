import React, { useEffect } from 'react';
import { ShoppingCartContextAction } from './ShoppingCartContextAction';
import { ShoppingCartContextActionType } from './ShoppingCartContextActionType';
import { ShoppingCartItem } from '../shared/types/ShoppingCartItem';
import * as shoppingCartService from '../api/shoppingCart';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

type RootState = {
  items: ShoppingCartItem[];
  totalPrice: number;
  totalCount: number;
};

const ShoppingCartStateContext = React.createContext<RootState>(initialState);

type ShoppingCartDispatch = React.Dispatch<ShoppingCartContextAction>;
const ShoppingCartDispatchContext = React.createContext<ShoppingCartDispatch>(
  () => {},
);

export const useShoppingCartDispatch = () =>
  React.useContext(ShoppingCartDispatchContext);
export const useShoppingCartStateValue = () =>
  React.useContext(ShoppingCartStateContext);

const reducer = (state: RootState, action: ShoppingCartContextAction) => {
  switch (action.type) {
    case ShoppingCartContextActionType.CLEAR_CART: {
      shoppingCartService.clearShoppingCart();

      return initialState;
    }

    case ShoppingCartContextActionType.ADD_TO_CART:
      const updatedItems = shoppingCartService.addToShoppingCart(
        action.payload,
      );

      return {
        items: [...updatedItems],
        totalPrice: state.totalPrice + action.payload.price,
        totalCount: state.totalCount + 1,
      };

    case ShoppingCartContextActionType.REMOVE_FROM_CART:
      const updatedItemsAfterRemove =
        shoppingCartService.removeFromShoppingCart(action.payload.id);

      const totalPrice = updatedItemsAfterRemove.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );

      const newTotalCount = updatedItemsAfterRemove.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      return {
        items: [...updatedItemsAfterRemove],
        totalPrice: totalPrice,
        totalCount: newTotalCount,
      };

    case ShoppingCartContextActionType.INCREASE_QUANTITY:
      const updatedItemsAfterIncrease =
        shoppingCartService.increaseQuantityInShoppingCart(action.payload.id);

      return {
        items: [...updatedItemsAfterIncrease],
        totalPrice: state.totalPrice + action.payload.price,
        totalCount: state.totalCount + 1,
      };

    case ShoppingCartContextActionType.DECREASE_QUANTITY:
      const updatedItemsAfterDecrease =
        shoppingCartService.decreaseQuantityInShoppingCart(action.payload.id);

      return {
        items: [...updatedItemsAfterDecrease],
        totalPrice: state.totalPrice - action.payload.price,
        totalCount: state.totalCount - 1,
      };

    case ShoppingCartContextActionType.ADD_PRODUCTS:
      const items = shoppingCartService.getShoppingCart();

      const price = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );

      const totalCount = items.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      return {
        items,
        totalPrice: price,
        totalCount: totalCount,
      };
  }
};

type Props = { children: React.ReactNode };

export const ShoppingCartProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ShoppingCartContextActionType.ADD_PRODUCTS });
  }, []);

  return (
    <ShoppingCartDispatchContext.Provider value={dispatch}>
      <ShoppingCartStateContext.Provider value={state}>
        {children}
      </ShoppingCartStateContext.Provider>
    </ShoppingCartDispatchContext.Provider>
  );
};
