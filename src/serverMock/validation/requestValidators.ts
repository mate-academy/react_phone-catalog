import { GlobalValidNameSpaceIDs } from '@server/static';
import {
  CategoryParams,
  ErrorObject,
  ItemsOnPage,
  OrderParams,
  RequestType,
  ValidCatalogueParams,
  ValidProdParams,
} from '@server/types';

interface ValidParams {
  status: true;
  request: RequestType;
  params?: ValidCatalogueParams | ValidProdParams;
}

export const getErrorObject = (msg: string): ErrorObject => {
  const errorObject: ErrorObject = {
    status: false,
    message: msg,
  };

  // eslint-disable-next-line no-console
  console.warn(msg);

  return errorObject;
};

const getValidParams = (
  req: RequestType,
  prm?: ValidCatalogueParams | ValidProdParams,
): ValidParams => {
  const validParams: ValidParams = {
    status: true,
    request: req,
  };

  if (prm) {
    validParams.params = prm;
  }

  return validParams;
};

function validateRequest(req: string): true | ErrorObject {
  if (!Object.values(RequestType).some(el => el === req)) {
    return getErrorObject(`Unreckognized request: ${req}`);
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateParams(request: any, params?: any): ValidParams | ErrorObject {
  const validatedRequest = validateRequest(request);

  if (validatedRequest !== true) {
    return validatedRequest;
  }

  switch (request) {
    case RequestType.BANNER:
      if (params) {
        return getErrorObject(`Unreckognized parameters: ${params}`);
      }

      return getValidParams(RequestType.BANNER);
    case RequestType.PRODUCT:
      const trueParams =
        Object.values(GlobalValidNameSpaceIDs).some(
          el => el === params.itemId,
        ) &&
        params.category !== CategoryParams.ALL &&
        Object.values(CategoryParams).some(el => el === params.category);

      if (!trueParams) {
        return getErrorObject(`Unreckognized parameters: ${params}`);
      }

      return getValidParams(RequestType.PRODUCT, params);
    case RequestType.CATALOGUE:
      const error = getErrorObject(`Unreckognized parameters: ${params}`);

      if (
        params.itemType &&
        !Object.values(CategoryParams).some(el => el === params.itemType)
      ) {
        return error;
      }

      if (
        params.sortOrder &&
        !Object.values(OrderParams).some(el => el === params.sortOrder)
      ) {
        return error;
      }

      if (
        params.itemsOnPage &&
        !Object.values(ItemsOnPage).some(el => el === params.itemsOnPage)
      ) {
        return error;
      }

      return getValidParams(RequestType.CATALOGUE, params);

    default:
      return getErrorObject('Something went wrong');
  }
}

export { validateParams, validateRequest };
