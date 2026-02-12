/* eslint-disable @typescript-eslint/indent */
import { createContext, useEffect, useReducer, useRef } from 'react';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { CartElement } from '../types/CartElement';

type State = {
  cartList: CartElement[];
  cartFilled: boolean;
};

type Action =
  | { type: 'setCartList'; payload: CartElement[] }
  | { type: 'increase'; payload: string }
  | { type: 'decrease'; payload: string }
  | { type: 'addItem'; payload: CartElement }
  | { type: 'removeItem'; payload: string }
  | { type: 'clearCart' }
  | { type: 'cartFilled'; payload: boolean };

const initState: State = {
  cartList: [],
  cartFilled: false,
};

const reducer = (state: State, action: Action) => {
  if (action.type === 'setCartList') {
    return {
      ...state,
      cartList: action.payload,
    };
  }

  if (action.type === 'addItem') {
    const inCart = state.cartList.find(
      product => product.id === action.payload.id,
    );

    if (!inCart) {
      return {
        ...state,
        cartList: [
          ...state.cartList,
          {
            id: action.payload.id,
            quantity: 1,
            product: action.payload.product,
          },
        ],
      };
    }

    return {
      ...state,
      cartList: [...state.cartList].map(product =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    };
  }

  if (action.type === 'removeItem') {
    return {
      ...state,
      cartList: [...state.cartList].filter(
        product => product.id !== action.payload,
      ),
    };
  }

  if (action.type === 'increase') {
    return {
      ...state,
      cartList: [...state.cartList].map(product =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    };
  }

  if (action.type === 'decrease') {
    return {
      ...state,
      cartList: [...state.cartList].map(product =>
        product.id === action.payload
          ? {
              ...product,
              quantity:
                product.quantity > 1 ? product.quantity - 1 : product.quantity,
            }
          : product,
      ),
    };
  }

  if (action.type === 'clearCart') {
    return {
      cartList: [],
      cartFilled: false,
    };
  }

  if (action.type === 'cartFilled') {
    return {
      ...state,
      cartFilled: action.payload,
    };
  }

  return state;
};

export const StateCartContext = createContext(initState);
export const DispatchCartContext = createContext((action: Action) => {});

export const GlobalCartListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItemList, setCartItemList] = useLocaleStorage<CartElement[]>(
    'cart',
    [],
  );
  const [cartState, cartDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    {
      cartList: cartItemList,
      cartFilled: initState.cartFilled,
    },
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    setCartItemList(cartState.cartList);
  }, [cartState.cartList, setCartItemList]);

  return (
    <DispatchCartContext.Provider value={cartDispatch}>
      <StateCartContext.Provider value={cartState}>
        {children}
      </StateCartContext.Provider>
    </DispatchCartContext.Provider>
  );
};
