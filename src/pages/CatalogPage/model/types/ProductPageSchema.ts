import { Product } from '../../../../entities/Product';
import {
  ProductsSortField,
  ProductsSortPerPage,
} from '../../../../shared/const';

export interface ProductPageSchema {
  productsCount: number;
  preparedProducts: Product[];
  isloading: boolean;
  error: boolean;
  sort: ProductsSortField;
  perPage: ProductsSortPerPage;
  pagesCount: number;
  currentPage: number;
  search: string;
}

type Void = undefined;

export type SortCallback = Void | ((a: Product, b: Product) => number);
