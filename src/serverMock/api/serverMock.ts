import { getBanners, getProduct, getCatalogueItems } from '../services';
import { RequestType, ValidResponse } from '../types';
import { validateParams } from '../validation';

async function getRequest(conf: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 800));
  const config = JSON.parse(conf);
  const request = config.request;
  let params = null;

  if (config.body) {
    params = config.body;
  }

  const validated =
    params !== null ? validateParams(request, params) : validateParams(request);

  if (validated.status === false) {
    return JSON.stringify(validated);
  }

  const response: ValidResponse = {
    status: true,
    data: [],
  };

  switch (validated.request) {
    case RequestType.BANNER:
      response.data = await getBanners();

      break;
    case RequestType.PRODUCT:
      response.data = await getProduct(params);

      break;
    case RequestType.CATALOGUE:
      const { data, currentPage, pages } = await getCatalogueItems(params);

      response.data = data;
      response.currentPage = currentPage;
      response.pages = pages;

      break;
  }

  return JSON.stringify(response);
}

export { getRequest };
