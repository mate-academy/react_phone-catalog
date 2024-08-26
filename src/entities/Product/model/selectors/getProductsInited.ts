import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';

export const getProductsInited = (state: StateSchema) => state.products._inited;
