import React, { createContext, useReducer } from 'react';
import { Product } from './types/product';
import { ShoppingProduct } from './types/shoppingProduct';

export const addCatalog = 'ADDCATALOG';
export const addFavorite = 'ADDFAVORITE';
export const removeFavorite = 'REMOVEFAVORITE';
export const addBasket = 'ADDBASKET';
export const removeProductInBasket = 'REMOVEPRODUCTINBASKET';
export const riseValueProduct = 'RISEVALUEPRODUCT';
export const reductionValueProduct = 'REDUCTIONVALUEPRODUCT';
export const selectProduct = 'SELECTPRODUCT';
export const load = 'LOAD';

type State = {
  catalogsProducts: Product[] | [];
  favoriteProducts: Product[] | [];
  basketList: ShoppingProduct[] | [];
  selectedProduct: Product | null;
  loader: boolean;
};

export type Action =
  | {
    type: typeof addCatalog;
    list: Product[];
  }
  | { type: typeof addFavorite; product: Product }
  | { type: typeof removeFavorite; age: number }
  | { type: typeof addBasket; product: ShoppingProduct }
  | { type: typeof removeProductInBasket; age: number }
  | { type: typeof riseValueProduct; id: number }
  | { type: typeof reductionValueProduct; id: number }
  | { type: typeof selectProduct; product: Product }
  | { type: typeof load; active: boolean };

export const initialState: State = {
  catalogsProducts: [],
  favoriteProducts:
    JSON.parse(localStorage.getItem('likeList') as string) || [],
  basketList: JSON.parse(localStorage.getItem('shoppingList') as string) || [],
  selectedProduct:
    JSON.parse(localStorage.getItem('product') as string) || null,
  loader: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case addCatalog:
      return {
        ...state,
        catalogsProducts: action.list,
      };
    case addFavorite:
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.product],
      };
    case removeFavorite:
      return {
        ...state,
        favoriteProducts: state.favoriteProducts.filter(
          (product: Product) => product.age !== action.age,
        ),
      };
    case addBasket:
      return {
        ...state,
        basketList: [...state.basketList, action.product],
      };
    case riseValueProduct:
      return {
        ...state,
        basketList: state.basketList.map((product: ShoppingProduct) => {
          if (product.item.age === action.id) {
            // eslint-disable-next-line no-param-reassign
            product.value += 1;
          }

          return product;
        }),
      };
    case reductionValueProduct:
      return {
        ...state,
        basketList: state.basketList.map((product: ShoppingProduct) => {
          if (product.item.age === action.id) {
            // eslint-disable-next-line no-param-reassign
            product.value -= 1;
          }

          return product;
        }),
      };
    case removeProductInBasket:
      return {
        ...state,
        basketList: state.basketList.filter(
          (product: ShoppingProduct) => product.item.age !== action.age,
        ),
      };
    case selectProduct:
      return {
        ...state,
        selectedProduct: action.product,
      };
    case load:
      return {
        ...state,
        loader: action.active,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  (obj: Action) => obj,
]);

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default StateProvider;
