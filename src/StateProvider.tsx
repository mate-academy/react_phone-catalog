import React, { useEffect, useMemo, useReducer } from 'react';
import { CartItem, Item } from './types';

interface IState {
  cartItems: CartItem[];
  favoriteItems: Item[];
  totalItems: number,
  totalPrice: number,
  favoritesLength: number,
  textInput: string,
}
// eslint-disable-next-line
const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'addOrDeleteItemInCart': {
      const findeItem = state.cartItems.some((item: CartItem) => {
        return item.id === action.item.id;
      });

      if (findeItem) {
        const newItems = state.cartItems.filter((item: CartItem) => {
          return item.id !== action.item.id;
        });

        localStorage.setItem('cartItems', JSON.stringify(newItems));

        return {
          ...state,
          cartItems: newItems,
        };
      }

      const newItem = {
        id: action.item.id,
        quantity: 1,
        product: action.item,
      };

      const newItems = [...state.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return {
        ...state,
        cartItems: newItems,
      };
    }

    case 'addOrDeleteItemInFavorite': {
      const findeItem = state.favoriteItems.some((item: Item) => {
        return item.id === action.item.id;
      });

      if (findeItem) {
        const newItems = state.favoriteItems.filter((item: Item) => {
          return item.id !== action.item.id;
        });

        localStorage.setItem('favoriteItems', JSON.stringify(newItems));

        return {
          ...state,
          favoriteItems: newItems,
        };
      }

      const newItem = {
        id: action.item.id,
        quantity: 1,
        product: action.item,
      };

      const newItems = [...state.favoriteItems, newItem];

      localStorage.setItem('favoriteItems', JSON.stringify(newItems));

      return {
        ...state,
        favoriteItems: newItems,
      };
    }

    case 'deleteItem': {
      const newCartItems = state.cartItems.filter((item: CartItem) => {
        return item.id !== action.id;
      });

      localStorage.setItem('cartItems', JSON.stringify(newCartItems));

      return {
        ...state,
        cartItems: newCartItems,
      };
    }

    case 'changeCount': {
      const newCartItems = state.cartItems.map((item: CartItem) => {
        if (item.product.id !== action.id) {
          return item;
        }

        return {
          ...item,
          quantity: action.option === 'add'
            ? item.quantity + 1 : item.quantity - 1,
        };
      });

      localStorage.setItem('cartItems', JSON.stringify(newCartItems));

      return {
        ...state,
        cartItems: newCartItems,
      };
    }

    case 'getCartProducts': {
      return {
        ...state,
        cartItems: action.dataFromCart || [],
      };
    }

    case 'getFavoriteProducts': {
      return {
        ...state,
        favoriteItems: action.dataFromFavorite || [],
      };
    }

    case 'setTotalItems': {
      return {
        ...state,
        totalItems: action.totalItems,
      };
    }

    case 'setTotalPrice': {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }

    case 'getFavoriteLength': {
      return {
        ...state,
        favoritesLength: action.favoritesLength,
      };
    }

    case 'setTextInput': {
      return {
        ...state,
        textInput: action.text,
      };
    }

    case 'setAppliedQuery': {
      return {
        ...state,
        appliedQuery: action.text,
      };
    }

    case 'clearInput': {
      return {
        ...state,
        textInput: action.text,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

const initialState = {
  cartItems: [],
  favoriteItems: [],
  totalItems: 0,
  totalPrice: 0,
  favoritesLength: 0,
  textInput: '',
  appliedQuery: '',
};

// eslint-disable-next-line
export const DispatchContext = React.createContext<(any)>(() => {});
// eslint-disable-next-line
export const StateContext = React.createContext<any>(initialState);

type Props = {
  children: React.ReactNode,
};

const getLocalStorae = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch {
    return '';
  }
};

export const StateProvider:React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const dataFromCart = getLocalStorae('cartItems');
    const dataFromFavorite = getLocalStorae('favoriteItems');

    dispatch({ type: 'getCartProducts', dataFromCart });
    dispatch({ type: 'getFavoriteProducts', dataFromFavorite });
  }, []);

  const totalItems = state.cartItems
    .reduce((acamulator: number, item: CartItem) => {
      return acamulator + item.quantity;
    }, 0);

  const totalPrice = state.cartItems
    .reduce((acamulator: number, item: CartItem) => {
      return acamulator + item.product.price * item.quantity;
    }, 0);

  const getFavoritesLength = useMemo(() => {
    return state.favoriteItems.length;
  }, [state.favoriteItems]);

  useEffect(() => {
    dispatch({
      type: 'getFavoriteLength',
      favoritesLength: getFavoritesLength,
    });
  }, [getFavoritesLength]);

  useEffect(() => {
    dispatch({ type: 'setTotalItems', totalItems });
    dispatch({ type: 'setTotalPrice', totalPrice });
  }, [state.cartItems, state.totalPrice]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
