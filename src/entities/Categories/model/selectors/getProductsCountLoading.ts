import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';

export const getProductsCountLoading = (state: StateSchema) =>
  state.categories.countProductsLoading;
