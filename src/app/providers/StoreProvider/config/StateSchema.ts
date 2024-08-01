import { ProductSchema } from '../../../../entities/Product';

export interface StateSchema {
  products: ProductSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
