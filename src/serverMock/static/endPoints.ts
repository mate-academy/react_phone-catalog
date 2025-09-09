import { ServerCategory } from '@server/types';

enum ApiEndpoint {
  ACCESSORIES = '/api/accessories.json',
  PHONES = '/api/phones.json',
  TABLETS = '/api/tablets.json',
  PRODUCTS = '/api/products.json',
  BANNERS = '/api/banners.json',
}

const endpointMap = new Map([
  [ServerCategory.ACCESSORIES, ApiEndpoint.ACCESSORIES],
  [ServerCategory.PHONES, ApiEndpoint.PHONES],
  [ServerCategory.TABLETS, ApiEndpoint.TABLETS],
]);

export { ApiEndpoint, endpointMap };
