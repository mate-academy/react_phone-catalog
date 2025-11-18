import {
  PerPage,
  ProductCategory,
  SortParams,
} from '@server/types/request.enums';
import {
  ValidAmountBody,
  ValidCartBody,
  ValidCatalogueBody,
  ValidProdBody,
} from '@server/types/requestBody.types';

enum EdgeCasesKeys {
  CART_ITEMS = 'cartItems',
  CATEGORY = 'category',
  SORT = 'sort',
  PER_PAGE = 'perPage',
  PAGE = 'page',
  USER_DETAILS = 'userDetails',
  DELIVERY_DETAILS = 'deliveryDetails',
  BIRTHDAY = 'birthday',
}

const amountBodySchema: ValidAmountBody = {
  [EdgeCasesKeys.CATEGORY]: ProductCategory.ALL,
};

const catalogueBodySchema: ValidCatalogueBody = {
  ...amountBodySchema,
  [EdgeCasesKeys.SORT]: SortParams.NONE,
  [EdgeCasesKeys.PER_PAGE]: PerPage.ALL,
  [EdgeCasesKeys.PAGE]: 0,
} as const;

const prodBodySchema: ValidProdBody = {
  itemId: '',
};

const cartBodySchema: ValidCartBody = {
  [EdgeCasesKeys.CART_ITEMS]: [{ id: '', amount: 0 }],
};

export {
  amountBodySchema,
  catalogueBodySchema,
  prodBodySchema,
  cartBodySchema,
};
