import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { storage } from '../../utils/localStorageHelper';
import { Product, ProductId } from '../../definitions/types/Product';
import { LocaleStorage } from '../../definitions/enums/LocaleStorage';
import { Category } from '../../definitions/enums/Category';
import { getProducts } from '../../api/products';

interface LocaleState {
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

export function createLocaleStorageProductsSlice(options: Options): Slice {
  const thunks = createThunks(options);
  const { add, remove, display } = thunks;

  const slice = createSlice({
    name: options.name,
    initialState: () => initState(options.key),
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(display.fulfilled, (state, action) => {
        state.items = action.payload;
      });

      builder.addCase(add.fulfilled, (state, action) => {
        state.ids.push(action.payload);
      });

      builder.addCase(remove.fulfilled, (state, action) => {
        state.ids.splice(state.ids.indexOf(action.payload), 1);
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

  const display = createAsyncThunk(`${name}/display`, async () => {
    const productIds = storage.init<ProductId[]>(key, []);
    const products: Product[] = [];

    for (const category in Category) {
      const productsForCategory = await getProducts(category as Category);

      products.concat(productsForCategory);
    }

    return products.filter(product => productIds.includes(product.id));
  });

  const add = createAsyncThunk(`${name}/add`,
    async (productId: ProductId) => {
      storage.push<ProductId>(key, productId);

      return productId;
    });

  const remove = createAsyncThunk(`${name}/remove`,
    async (productId: ProductId) => {
      storage.remove<ProductId>(key, productId);

      return productId;
    });

  return {
    add,
    display,
    remove,
  };
}
