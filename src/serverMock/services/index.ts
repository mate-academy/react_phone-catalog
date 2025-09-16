import { RequestType } from '@server/types';
import { getBanners } from './bannerService';
import { getAmount, getProduct } from './productService';
import { getCatalogueItems } from './catalogService';

const getService = {
  [RequestType.CATALOGUE]: getCatalogueItems,
  [RequestType.PRODUCT]: getProduct,
  [RequestType.BANNER]: getBanners,
  [RequestType.AMOUNT]: getAmount,
};

export { getService };
