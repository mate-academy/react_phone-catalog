import { GlobalValidNameSpaceIDs } from '@server/static';
import {
  CategoryParams,
  ItemsOnPage,
  OrderParams,
  BaseProduct,
  Product,
  BannerData,
} from '.';

interface ErrorObject {
  status: false;
  message: string;
}

interface ValidCatalogueParams {
  itemType?: CategoryParams;
  sortOrder?: OrderParams;
  itemsOnPage?: ItemsOnPage;
  page?: number;
}

interface ValidProdParams {
  category: Omit<CategoryParams, CategoryParams.ALL>;
  itemId: GlobalValidNameSpaceIDs;
}

type ValidParams = ValidCatalogueParams | ValidProdParams;

interface ValidResponse {
  status: true;
  data: BaseProduct[] | Product[] | BannerData[];
  currentPage?: number;
  pages?: number;
}

export {
  type ValidCatalogueParams,
  type ValidProdParams,
  type ValidParams,
  type ErrorObject,
  type ValidResponse,
};
