import { ReducerCreators, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { storage } from '../../../utils/localStorageHelper';
import { Product, ProductId, StorageProduct } from '../../../definitions/types/Product';
import { LocaleStorage } from '../../../definitions/enums/LocaleStorage';
import { getProducts } from '../../../api/products/client/products';
import { QueryOptions } from "../../../api/products/server/types";

export interface LocaleState {
  storageProducts: StorageProduct[],
  products: Product[],
  loading: boolean,
  error: string,
}

interface Options {
  name: string,
  key: LocaleStorage,
}

const initState = (key: LocaleStorage): LocaleState => {
  const productIds = storage.init<StorageProduct[]>(key, []);

  return {
    storageProducts: productIds,
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
      selectStorageProducts: state => state.storageProducts,
      selectLoading: state => state.error,
      selectError: state => state.loading,
      selectProducts: state => state.products,
      selectEmptyList: state => state.storageProducts.length === 0,
    },
    reducers: (create: ReducerCreators<LocaleState>) => ({
      addProduct: create.asyncThunk(
        async (productId: ProductId) => {
          const storageProducts = storage.read<StorageProduct[]>(key) ?? [];
          let storageProduct = storageProducts.find(storageProduct => storageProduct.id === productId);

          if (!storageProduct) {
            storageProducts.push({
              id: productId,
              amount: 1,
            });
          }

          storage.write<StorageProduct[]>(key, storageProducts);
          return storageProducts;
        },
        {
          fulfilled: (state, action) => { state.storageProducts = action.payload },
        }
      ),
      removeProduct: create.asyncThunk(
        async (productId: ProductId) => {
          const storageProducts = storage.read<StorageProduct[]>(key) ?? [];
          const storageProductIndex = storageProducts.findIndex(
            storageProduct => storageProduct.id === productId
          );

          if (storageProductIndex === -1) {
            throw new Error(`You can't remove product from array, because it doesn't exist. ProductId: ${productId}`);
          }

          storageProducts.splice(storageProductIndex, 1);
          storage.write<StorageProduct[]>(key, storageProducts);
          return storageProducts;
        },
        {
          fulfilled: (state, action) => { state.storageProducts = action.payload },
        }
      ),
      amountIncrease: create.asyncThunk(
        async (productId: ProductId) => {
          const storageProducts = storage.read<StorageProduct[]>(key) ?? [];
          let storageProduct = storageProducts.find(storageProduct => storageProduct.id === productId);

          if (storageProduct) {
            storageProduct.amount++;
          } else {
            storageProduct = {
              id: productId,
              amount: 1,
            };

            storageProducts.push(storageProduct);
          }

          storage.write<StorageProduct[]>(key, storageProducts);

          return storageProducts;
        },
        {
          fulfilled: (state, action) => {state.storageProducts = action.payload},
        }
      ),

      amountDecrease: create.asyncThunk(
        async (productId: ProductId) => {
          const storageProducts = storage.read<StorageProduct[]>(key) ?? [];
          let storageProductIndex = storageProducts.findIndex(
            storageProduct => storageProduct.id === productId
          );

          if (storageProductIndex === -1) {
            throw new Error(`You can't remove product from array, because it doesn't exist. ProductId: ${productId}`);
          }

          let storageProduct = storageProducts[storageProductIndex];
          storageProduct.amount--;

          if (storageProduct.amount === 0) {
            storageProducts.splice(storageProductIndex, 1);
          }

          storage.write(key, storageProducts);

          return storageProducts;
        },
        {
          fulfilled: (state, action) => { state.storageProducts = action.payload; },
        }
      ),

      display: create.asyncThunk(async (initialOptions: QueryOptions = {}) => {
        const storageProducts = storage.init<StorageProduct[]>(key, []);

        if (storageProducts.length === 0) {
          return {
            products: [],
            amount: 0,
          };
        }

        const ids = storageProducts.map(product => product.id);
        const options: QueryOptions = {...initialOptions, ids};

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
