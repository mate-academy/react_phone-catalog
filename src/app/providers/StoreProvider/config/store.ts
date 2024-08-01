/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { ProductSliceReducer } from '../../../../entities/Product';

export function createReduxStore() {
  return configureStore<StateSchema>({
    reducer: {
      products: ProductSliceReducer,
    },
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
