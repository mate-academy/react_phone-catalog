import { BannerData, CatalogueProduct, Product } from '@shared/types';
import { Request } from '.';

interface CatalogueData {
  items: CatalogueProduct[] | Product[];
  currentPage: number;
  pages: number;
}

enum ResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ErrorObject {
  status: ResponseStatus.ERROR;
  message: string;
}

interface SuccessResponse {
  status: ResponseStatus.SUCCESS;
}

interface BannerResponse extends SuccessResponse {
  data: BannerData[];
}

interface ProductResponse extends SuccessResponse {
  data: Product;
}

interface CatalogueResponse extends SuccessResponse {
  data: CatalogueData;
}

interface AmountResponse extends SuccessResponse {
  data: number;
}

enum LoadStatus {
  LOADING = 'Loading...',
  ERROR = 'Error',
}

type ServerResponseMap = {
  [Request.BANNER]: BannerResponse;
  [Request.PRODUCT]: ProductResponse;
  [Request.CATALOGUE]: CatalogueResponse;
  [Request.AMOUNT]: AmountResponse;
};

type ResponseDataMap = {
  [K in Request]: ServerResponseMap[K]['data'];
};

export {
  type CatalogueData,
  type ResponseDataMap,
  ResponseStatus,
  type ErrorObject,
  type ServerResponseMap,
  LoadStatus,
};
