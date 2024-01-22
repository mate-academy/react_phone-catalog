import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { storage } from '../../utils/localStorageHelper';
import { Product } from '../../types/Product';
import { LocaleStorage } from '../../constants/LocaleStorage';

interface State {
  [key: string]: Product,
}

interface Options {
  name: string,
  key: LocaleStorage,
}

export function createLocaleStorageProductsSlice(options: Options): Slice {
  const thunks = createThunks(options);
  const { init, add, remove } = thunks;

  const slice = createSlice({
    name: options.name,
    initialState: {} as State,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(init.fulfilled, (_, action) => action.payload);

      builder.addCase(add.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload;
      });

      builder.addCase(remove.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
    },
  });

  return {
    ...slice,
    actions: {
      ...thunks,
      ...slice.actions,
    },
  };
}

function createThunks(options: Options) {
  const { name, key } = options;

  const init = createAsyncThunk(`${name}/init`, async (products: Product[]) => {
    const favoritesIds = storage.init<string[]>(key, []);
    const initialState: State = {};

    favoritesIds.forEach(id => {
      const thisProduct = products.find(product => product.id === id);

      if (thisProduct) {
        initialState[id] = thisProduct;
      }
    });

    return initialState;
  });

  const add = createAsyncThunk(`${name}/add`,
    async (product: Product) => {
      storage.push<string>(key, product.id);

      return product;
    });

  const remove = createAsyncThunk(`${name}/remove`,
    async (product: Product) => {
      storage.remove<string>(key, product.id);

      return product;
    });

  return {
    add,
    init,
    remove,
  };
}
