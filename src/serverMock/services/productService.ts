import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import {
  ErrorObject,
  Product,
  ServerCategory,
  Status,
  ValidAmountParams,
  ValidProdParams,
  ValidResponse,
} from '@server/types';

async function getProduct(
  params: ValidProdParams,
): Promise<ValidResponse | ErrorObject> {
  const { itemId } = params;

  const product = ((await apiFetch(ApiEndpoint.ITEMS)) as Product[]).filter(
    (el: Product) => el.id === itemId,
  );

  if (product.length === 0) {
    return {
      status: Status.ERROR,
      message: 'Requested item does not exist',
    };
  }

  return {
    status: Status.SUCCESS,
    items: product[0],
  };
}

async function getAmount(params: ValidAmountParams): Promise<ValidResponse> {
  const initArray = (await apiFetch(ApiEndpoint.ITEMS)) as Product[];

  const length =
    params.category === ServerCategory.ALL
      ? initArray.length
      : initArray.filter(el => el.category === params.category).length;

  return {
    status: Status.SUCCESS,
    items: length,
  };
}

export { getProduct, getAmount };
