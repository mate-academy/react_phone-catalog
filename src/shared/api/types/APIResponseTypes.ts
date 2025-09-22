import { BannerData, CatalogueProduct, Product } from '@shared/types';
import { Request } from '.';

interface CatalogueData {
  items: CatalogueProduct[];
  currentPage: number;
  pages: number;
}

type ResponseDataMap = {
  [Request.BANNER]: BannerData[];
  [Request.PRODUCT]: Product;
  [Request.CATALOGUE]: CatalogueData;
  [Request.AMOUNT]: number;
};

type GetResponseData<T extends Request> = ResponseDataMap[T];

export { type CatalogueData, type ResponseDataMap, type GetResponseData };
