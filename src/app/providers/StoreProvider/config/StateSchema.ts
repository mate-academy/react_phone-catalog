import {
  CategoriesSchema,
  categoriesSliceName,
} from '../../../../entities/Categories';
import { productPageSliceName } from '../../../../pages/CatalogPage';
import { ProductPageSchema } from '../../../../pages/CatalogPage/model/types/ProductPageSchema';
import { HomePageSchema, homePageSliceName } from '../../../../pages/HomePage';

export interface StateSchema {
  [productPageSliceName]: ProductPageSchema;
  [homePageSliceName]: HomePageSchema;
  [categoriesSliceName]: CategoriesSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
