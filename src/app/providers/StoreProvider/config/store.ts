/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { productPageSliceReducer } from './../../../../pages/CatalogPage';
import { homePageSliceReducer } from '../../../../pages/HomePage';
import { categoriesSliceReducer } from '../../../../entities/Categories';

export function createReduxStore() {
  return configureStore<StateSchema>({
    reducer: {
      productsPage: productPageSliceReducer,
      homePage: homePageSliceReducer,
      categories: categoriesSliceReducer,
    },
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export type RootState = ReturnType<typeof createReduxStore>['getState'];
