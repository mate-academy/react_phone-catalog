import { ApiResponseMap, RequestBodyMap, Error } from './types/api.types';
import { Methods, Request } from './types/api.enums';
import { getRequest } from '@server/api/serverMock';
import { CartItem, CatalogueBody, CheckoutBody } from './types/bodies.types';
import { Category } from '@shared/types';

async function makeApiRequest<T extends Request>(
  requestData: RequestBodyMap[T],
): Promise<ApiResponseMap[T] | Error> {
  const request = JSON.stringify(requestData);
  const response = await getRequest(request);
  const parsed = JSON.parse(response);

  return parsed;
}

const get = {
  banners: () =>
    makeApiRequest<Request.BANNER>({
      method: Methods.GET,
      request: Request.BANNER,
    }),
  product: (itemId: string) =>
    makeApiRequest<Request.PRODUCT>({
      method: Methods.GET,
      request: Request.PRODUCT,
      body: { itemId: itemId },
    }),
  catalogue: (conf: CatalogueBody) =>
    makeApiRequest<Request.CATALOGUE>({
      method: Methods.GET,
      request: Request.CATALOGUE,
      body: conf,
    }),
  length: (category: Category) =>
    makeApiRequest<Request.AMOUNT>({
      method: Methods.GET,
      request: Request.AMOUNT,
      body: { category: category },
    }),
  cart: (items: CartItem[]) =>
    makeApiRequest<Request.CART>({
      method: Methods.GET,
      request: Request.CART,
      body: { cartItems: items },
    }),
};

const post = {
  checkout: (body: CheckoutBody) =>
    makeApiRequest<Request.CHECKOUT>({
      method: Methods.POST,
      request: Request.CHECKOUT,
      body: body,
    }),
};

export { get, post };
