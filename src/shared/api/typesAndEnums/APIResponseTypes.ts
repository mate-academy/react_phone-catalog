import { BannerData, CatalogueProduct, Product } from '@shared/types';

enum ResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ErrorMessage {
  status: ResponseStatus.ERROR;
  message: string;
}

interface BasicResponse<T> {
  status: ResponseStatus.SUCCESS;
  data: T;
}

interface CatalogueData {
  items: CatalogueProduct[] | null;
  currentPage: number;
  pages: number;
}

type CatalogueResponse = BasicResponse<CatalogueData>;
type BannerResponse = BasicResponse<BannerData[]>;
type ItemResponse = BasicResponse<Product | null>;
type LengthResponse = BasicResponse<number>;

export {
  ResponseStatus,
  type ErrorMessage,
  type CatalogueData,
  type CatalogueResponse,
  type BannerResponse,
  type ItemResponse,
  type LengthResponse,
};
