import { Product } from '../types/Product';

type State = {
  products: Product[],
  isLoading: boolean,
};

export enum ProductsActionType {
  LOADING = 'loading',
  SUCCESS = 'success',
}

export type ProductsAction =
| { type: ProductsActionType.LOADING }
| { type: ProductsActionType.SUCCESS, payload: Product[] };

export const productsReducer = (state: State, action: ProductsAction) => {
  switch (action.type) {
    case ProductsActionType.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ProductsActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    default:
      throw new Error('Uknown action');
  }
};
