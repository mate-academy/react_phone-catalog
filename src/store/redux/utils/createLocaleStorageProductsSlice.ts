import { ReducerCreators, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { storage } from '../../../utils/localStorageHelper';
import { Product, ProductId } from '../../../definitions/types/Product';
import { LocaleStorage } from '../../../definitions/enums/LocaleStorage';
import { getProducts } from '../../../api/products/client/products';
import { QueryOptions } from "../../../api/products/server/types";

export interface LocaleState {
  ids: ProductId[],
  products: Product[],
  loading: boolean,
  error: string,
}

interface Options {
  name: string,
  key: LocaleStorage,
}

const initState = (key: LocaleStorage): LocaleState => {
  const productIds = storage.init<ProductId[]>(key, []);

  return {
    ids: productIds,
    products: [],
    loading: false,
    error: '',
  };
};

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export function getLocaleStorageProductsSlice(options: Options) {
  const { key, name } = options;

  const slice = createSlice({
    name: name,
    initialState: () => initState(key),
    selectors: {
      selectState: state => state,
      selectIds: state => state.ids,
      selectLoading: state => state.error,
      selectError: state => state.loading,
      selectProducts: state => state.products,
    },
    reducers: (create: ReducerCreators<LocaleState>) => ({
      add: create.asyncThunk(
        async (productId: ProductId) => {
          storage.push<ProductId>(key, productId);

          return productId;
        },
        {
          fulfilled: (state, action) => { state.ids.push(action.payload) }
        }
      ),

      remove: create.asyncThunk(
        async (productId: ProductId) => {
          storage.remove<ProductId>(key, productId);

          return productId;
        },
        {
          fulfilled: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload), 1);
          }
        }
      ),

      display: create.asyncThunk(async (initialOptions: QueryOptions) => {
        const productIds = storage.init<ProductId[]>(key, []);

        if (productIds.length === 0) {
          return { products: [], amount: 0 };
        }

        const options: QueryOptions = {...initialOptions, ids: productIds};

        return getProducts(options);
      },
        {
          pending: (state) => {
            state.loading = true;
          },
          rejected: (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Some Error';
          },
          fulfilled: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
          }
        }
      )
    }),
  });

  return slice;
}
