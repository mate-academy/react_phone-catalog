import { BannerData, BaseProduct, Product } from '@server/types';

enum ApiEndpoint {
  PRODUCTS = 'api/products.json',
  BANNERS = 'api/banners.json',
  ITEMS = 'api/items.json',
}

type FetchDataTypesMap = {
  [ApiEndpoint.BANNERS]: BannerData[];
  [ApiEndpoint.PRODUCTS]: BaseProduct[];
  [ApiEndpoint.ITEMS]: Product[];
};

export { ApiEndpoint, type FetchDataTypesMap };
