import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';

export const getSearch = (state: StateSchema) => state.productsPage.search;
