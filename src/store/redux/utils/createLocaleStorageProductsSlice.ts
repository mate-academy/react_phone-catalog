import { ReducerCreators, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { storage } from '../../../utils/localStorageHelper';
import { Product, ProductId } from '../../../definitions/types/Product';
import { LocaleStorage } from '../../../definitions/enums/LocaleStorage';

export interface LocaleState {
  ids: ProductId[],
  items: Product[],
}

interface Options {
  name: string,
  key: LocaleStorage,
}

const initState = (key: LocaleStorage): LocaleState => {
  const productIds = storage.init<ProductId[]>(key, []);

  return {
    ids: productIds,
    items: [],
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
      selectProducts: state => state.items,
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

      display: create.asyncThunk(async () => {
        const productIds = storage.init<ProductId[]>(key, []);
        const products: Product[] = [];

        // for (const category in Category) {
        //   const productsForCategory = await getAllProducts(category as Category);

        //   products.concat(productsForCategory);
        // }

        return products.filter(product => productIds.includes(product.id));
      },
        {
          fulfilled: (state, action) => {
            state.items = action.payload;
          }
        }
      )
    }),
  });

  return slice;
}
