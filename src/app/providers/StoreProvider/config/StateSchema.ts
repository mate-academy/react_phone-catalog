import {
  CategoriesSchema,
  categoriesSliceName,
} from '../../../../entities/Categories';
import { ProductSchema, ProductSliceName } from '../../../../entities/Product';
import { productPageSliceName } from '../../../../pages/CatalogPage';
import { ProductPageSchema } from '../../../../pages/CatalogPage/model/types/ProductPageSchema';
import { HomePageSchema, homePageSliceName } from '../../../../pages/HomePage';

export interface StateSchema {
  [ProductSliceName]: ProductSchema;
  [productPageSliceName]: ProductPageSchema;
  [homePageSliceName]: HomePageSchema;
  [categoriesSliceName]: CategoriesSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
