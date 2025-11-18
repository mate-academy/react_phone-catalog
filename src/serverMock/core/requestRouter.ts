import {
  amountBodySchema,
  cartBodySchema,
  catalogueBodySchema,
  checkoutBodySchema,
  prodBodySchema,
} from '@server/schemas';
import {
  getAmount,
  getBanners,
  getCatalogueItems,
  getProduct,
  getTotalPrice,
  proceedCheckout,
} from '@server/services';
import {
  GetRequests,
  Methods,
  PostRequests,
  ProcessingResult,
} from '@server/types';
import { ValidServiceBodies } from '@server/types/serviceResult.types';
import { shapeValidator } from '@server/validation';

export type ExecFn = <T extends ValidServiceBodies, R>(
  body: unknown,
  schema: T,
  service: (body: T) => R,
) => ProcessingResult<() => R>;

const getExec: ExecFn = (body, schema, service) => {
  const validatedBody = shapeValidator(body, schema);

  if (!validatedBody.ok) {
    return validatedBody;
  }

  const exec = () => {
    return service(validatedBody.data);
  };

  return { ok: true, data: exec };
};

const router = {
  [Methods.GET]: {
    [GetRequests.PRODUCT]: (body: unknown) =>
      getExec(body, prodBodySchema, getProduct),
    [GetRequests.CATALOGUE]: (body: unknown) =>
      getExec(body, catalogueBodySchema, getCatalogueItems),
    [GetRequests.BANNER]: getBanners,
    [GetRequests.CART]: (body: unknown) =>
      getExec(body, cartBodySchema, getTotalPrice),
    [GetRequests.AMOUNT]: (body: unknown) =>
      getExec(body, amountBodySchema, getAmount),
  },
  [Methods.POST]: {
    [PostRequests.CHECKOUT]: (body: unknown) =>
      getExec(body, checkoutBodySchema, proceedCheckout),
  },
};

export { router };
