import { apiFetch, createError } from '@server/helpers';
import { ApiEndpoint, ServerCategory } from '@server/static';
import {
  Product,
  ServiceResult,
  Status,
  ValidAmountBody,
  ValidProdBody,
} from '@server/types';

async function getProduct(
  body: ValidProdBody,
): Promise<ServiceResult<Product>> {
  const { itemId } = body;

  const fetchResult = await apiFetch(ApiEndpoint.ITEMS);

  if (fetchResult.status !== Status.SUCCESS) {
    return fetchResult;
  }

  const product = fetchResult.data.filter(el => el.id === itemId);

  if (product.length === 0) {
    return createError(404, 'Requested item does not exist');
  }

  return {
    status: Status.SUCCESS,
    data: product[0],
  };
}

async function getAmount(
  body: ValidAmountBody,
): Promise<ServiceResult<number>> {
  const { category } = body;
  const fetchResult = await apiFetch(ApiEndpoint.ITEMS);

  if (fetchResult.status !== Status.SUCCESS) {
    return fetchResult;
  }

  const initialArray =
    category === ServerCategory.ALL
      ? fetchResult.data
      : fetchResult.data.filter(el => el.category === category);

  return {
    status: Status.SUCCESS,
    data: initialArray.length,
  };
}

export { getProduct, getAmount };
