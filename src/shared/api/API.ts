/* eslint-disable no-console */
import { getRequest } from '@server/api/serverMock';
import {
  CatalogueConf,
  Category,
  GetRequestBody,
  GetResponseData,
  Request,
  ResponseStatus,
} from './types';
import { Status } from '@features/index';

async function makeApiRequest<T extends Request>(
  requestData: GetRequestBody<T>,
): Promise<GetResponseData<T> | Status.ERROR> {
  const response = JSON.parse(await getRequest(JSON.stringify(requestData)));

  if (response.status === ResponseStatus.ERROR) {
    console.warn(`Unable to load data, error: ${response.message}`);

    return Status.ERROR;
  }

  return response.data;
}

const get = {
  banners: () => makeApiRequest({ request: Request.BANNER }),
  product: (conf: string) =>
    makeApiRequest({ request: Request.PRODUCT, body: { itemId: conf } }),
  catalogue: (conf: CatalogueConf) =>
    makeApiRequest({ request: Request.CATALOGUE, body: conf }),
  length: (category: Category) =>
    makeApiRequest({ request: Request.AMOUNT, body: { category: category } }),
};

export { get };
