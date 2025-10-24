/* eslint-disable no-console */
import { getRequest } from '@server/api/serverMock';
import {
  CatalogueConf,
  Category,
  ErrorObject,
  LoadStatus,
  Request,
  RequestBodyMap,
  ResponseDataMap,
  ResponseStatus,
  ServerResponseMap,
} from './types';

function isErrorResponse(
  response: ServerResponseMap[Request] | ErrorObject,
): response is ErrorObject {
  return response.status === ResponseStatus.ERROR;
}

async function makeApiRequest<T extends Request>(
  requestData: RequestBodyMap[T],
): Promise<ResponseDataMap[T] | LoadStatus.ERROR> {
  const response: ServerResponseMap[T] | ErrorObject = JSON.parse(
    await getRequest(JSON.stringify(requestData)),
  );

  if (isErrorResponse(response)) {
    console.warn(`Unable to load data, error: ${response.message}`);

    return LoadStatus.ERROR;
  }

  return response.data as ResponseDataMap[T];
}

const get = {
  banners: () => makeApiRequest<Request.BANNER>({ request: Request.BANNER }),
  product: (conf: string) =>
    makeApiRequest<Request.PRODUCT>({
      request: Request.PRODUCT,
      body: { itemId: conf },
    }),
  catalogue: (conf: CatalogueConf) =>
    makeApiRequest<Request.CATALOGUE>({
      request: Request.CATALOGUE,
      body: conf,
    }),
  length: (category: Category) =>
    makeApiRequest<Request.AMOUNT>({
      request: Request.AMOUNT,
      body: { category: category },
    }),
};

export { get };
