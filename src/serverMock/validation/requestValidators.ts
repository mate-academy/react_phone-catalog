import { GlobalValidNameSpaceIDs } from '@server/static/IDvalidationData';
import {
  CategoryParams,
  ItemsOnPage,
  MethodType,
  OrderParams,
  RequestType,
  ValidParams,
} from '@server/types';

function validateMethod(method: string): method is MethodType {
  return Object.values(MethodType).some(el => el === method);
}

function validateRequest(req: string): req is RequestType {
  return Object.values(RequestType).some(el => el === req);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateParams(params: any): params is ValidParams {
  const { request } = params;

  if (!validateRequest(request)) {
    return false;
  }

  switch (request) {
    case RequestType.BANNER:
      return Object.keys(params).length === 1;
    case RequestType.PRODUCT:
      return (
        Object.values(GlobalValidNameSpaceIDs).some(
          el => el === params.itemId,
        ) &&
        params.category !== CategoryParams.ALL &&
        Object.values(CategoryParams).some(el => el === params.category)
      );
    case RequestType.CATALOGUE:
      if (
        params.itemType &&
        !Object.values(CategoryParams).some(el => el === params.itemType)
      ) {
        return false;
      }

      if (
        params.sortOrder &&
        !Object.values(OrderParams).some(el => el === params.sortOrder)
      ) {
        return false;
      }

      if (
        params.itemsOnPage &&
        !Object.values(ItemsOnPage).some(el => el === params.itemsOnPage)
      ) {
        return false;
      }

      return true;

    default:
      return false;
  }
}

export { validateMethod, validateParams };
