/* eslint-disable @typescript-eslint/indent */
import { BaseProduct, Category } from '@shared/types/APITypes';

interface CategoriesParams {
  sort: Sort;
  itemsOnPage: ItemsOnPage;
  page: number;
  itemType?: TypeParam;
}

enum Sort {
  NONE = 'none',
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

enum ItemsOnPage {
  NONE = 'none',
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

interface CatalogParams {
  sort: Sort;
  itemsOnPage: ItemsOnPage;
  page: number;
  itemType?: TypeParam;
}

type TypeParam = Pick<
  typeof Category,
  'Accessories' | 'Phones' | 'Tablets'
>[keyof Pick<typeof Category, 'Accessories' | 'Phones' | 'Tablets'>];

interface Response {
  totalPages: number;
  length: number;
  dataArray: BaseProduct[];
  currentPage: number;
}

export {
  type CategoriesParams,
  Sort,
  ItemsOnPage,
  type CatalogParams,
  type Response,
  type TypeParam,
};
