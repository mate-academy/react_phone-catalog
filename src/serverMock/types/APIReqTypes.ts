import { GlobalValidNameSpaceIDs } from '@server/static/IDvalidationData';

enum MethodType {
  GET = 'GET',
}

enum RequestType {
  CATALOGUE = 'catalogue',
  PRODUCT = 'product',
  BANNER = 'banner',
}

enum CategoryParams {
  ALL = 'all',
  ACCESSORIES = 'accessories',
  PHONES = 'phones',
  TABLETS = 'tablets',
}

enum OrderParams {
  NONE = 'none',
  AGE = 'age',
  TITLE = 'title',
  PRICE_ASC = 'price',
  FULL_PRICE_DECS_PROMO = 'hotPrice',
}

enum ItemsOnPage {
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

interface ValidCatalogueParams {
  request: RequestType.CATALOGUE;
  itemType?: CategoryParams;
  sortOrder?: OrderParams;
  itemsOnPage?: ItemsOnPage;
  page?: number;
}

interface ValidBannerParams {
  request: RequestType.BANNER;
}

interface ValidProdParams {
  request: RequestType.PRODUCT;
  category: Omit<CategoryParams, CategoryParams.ALL>;
  itemId: GlobalValidNameSpaceIDs;
}

type ValidParams = ValidCatalogueParams | ValidBannerParams | ValidProdParams;

export {
  MethodType,
  RequestType,
  CategoryParams,
  OrderParams,
  ItemsOnPage,
  type ValidCatalogueParams,
  type ValidBannerParams,
  type ValidProdParams,
  type ValidParams,
};
