import { GlobalValidNameSpaceIDs } from '@server/static';
import {
  ServerCategory,
  ErrorObject,
  ItemsOnPage,
  OrderParams,
  RequestType,
  ValidAmountParams,
  ValidCatalogueParams,
  ValidProdParams,
} from '@server/types';

interface ValidParams {
  status: true;
  request: RequestType;
  params?: ValidCatalogueParams | ValidProdParams | ValidAmountParams;
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
  prm?: ValidCatalogueParams | ValidProdParams | ValidAmountParams,
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
        return getErrorObject(
          `Unreckognized parameters: ${JSON.stringify(params)}`,
        );
      }

      return getValidParams(RequestType.BANNER);
    case RequestType.PRODUCT:
      const trueParams =
        Object.values(GlobalValidNameSpaceIDs).some(
          el => el === params.itemId,
        ) &&
        params.category !== ServerCategory.ALL &&
        Object.values(ServerCategory).some(el => el === params.category);

      if (!trueParams) {
        return getErrorObject(`Unreckognized parameters: ${params}`);
      }

      return getValidParams(RequestType.PRODUCT, params);
    case RequestType.CATALOGUE:
      if (
        params.itemType &&
        !Object.values(ServerCategory).some(el => el === params.itemType)
      ) {
        return getErrorObject(`Invalid itemType: ${params.itemType}`);
      }

      if (
        params.sort &&
        !Object.values(OrderParams).some(el => el === params.sort)
      ) {
        return getErrorObject(`Invalid sortOrder: ${params.sort}`);
      }

      if (
        params.perPage &&
        !Object.values(ItemsOnPage).some(el => el === params.perPage)
      ) {
        return getErrorObject(`Invalid itemsOnPage: ${params.perPage}`);
      }

      return getValidParams(RequestType.CATALOGUE, params);

    case RequestType.AMOUNT:
      if (
        params.category !== ServerCategory.ALL &&
        Object.values(ServerCategory).some(el => el === params.category)
      ) {
        return getValidParams(RequestType.AMOUNT, params);
      }

      return getErrorObject(`Invalid category param: ${params.category}`);

    default:
      return getErrorObject('Something went wrong');
  }
}

export { validateParams, validateRequest };
