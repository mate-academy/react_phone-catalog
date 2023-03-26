import React, { createContext, useReducer } from 'react';
import { Product } from './types/product';
import { ShoppingProduct } from './types/shoppingProduct';

type State = {
  catalogsProducts: Product[] | [],
  favoriteProducts: Product[] | [],
  basketList: ShoppingProduct [] | [],
  selectedProduct: Product | null,
  loader: boolean
};

export type Action = {
  type: 'addCatalog', list: Product[]
}
| { type: 'addFavorite', product: Product }
| { type: 'removeFavorite', age: number }
| { type: 'addBasket', product: ShoppingProduct }
| { type: 'removeProductInBasket', age: number }
| { type: 'riseValueProduct', id: number }
| { type: 'reductionValueProduct', id: number }
| { type: 'selectProduct', product: Product }
| { type: 'load', active: boolean };

export const initialState: State = {
  catalogsProducts: [],
  favoriteProducts: JSON.parse(localStorage
    .getItem('likeList') as string) || [],
  basketList: JSON.parse(localStorage.getItem('shoppingList') as string) || [],
  selectedProduct: JSON.parse(localStorage.getItem('product') as string)
  || null,
  loader: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addCatalog':
      return {
        ...state,
        catalogsProducts: action.list,
      };
    case 'addFavorite':
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.product],
      };
    case 'removeFavorite':
      return {
        ...state,
        favoriteProducts: state.favoriteProducts
          .filter((product:Product) => product.age !== action.age),
      };
    case 'addBasket':
      return {
        ...state,
        basketList: [...state.basketList, action.product],
      };
    case 'riseValueProduct':
      return {
        ...state,
        basketList: state.basketList
          .map((product: ShoppingProduct) => {
            if (product.item.age === action.id) {
              // eslint-disable-next-line no-param-reassign
              product.value += 1;
            }

            return product;
          }),
      };
    case 'reductionValueProduct':
      return {
        ...state,
        basketList: state.basketList
          .map((product: ShoppingProduct) => {
            if (product.item.age === action.id) {
              // eslint-disable-next-line no-param-reassign
              product.value -= 1;
            }

            return product;
          }),
      };
    case 'removeProductInBasket':
      return {
        ...state,
        basketList: state.basketList
          .filter(
            (product: {
              item:Product, value: number
            }) => product.item.age !== action.age,
          ),
      };
    case 'selectProduct':
      return {
        ...state,
        selectedProduct: action.product,
      };
    case 'load':
      return {
        ...state,
        loader: action.active,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<
[State, React.Dispatch<Action>]
>([initialState, (obj:Action) => obj]);

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default StateProvider;
