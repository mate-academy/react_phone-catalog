import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import { CategoryParams, Product, ValidAmountParams } from '@server/types';

async function getItemsAmount(params: ValidAmountParams): Promise<number> {
  const category = params.category;
  let endpoint;

  switch (category) {
    case CategoryParams.ACCESSORIES:
      endpoint = ApiEndpoint.ACCESSORIES;
      break;
    case CategoryParams.PHONES:
      endpoint = ApiEndpoint.PHONES;
      break;
    case CategoryParams.TABLETS:
      endpoint = ApiEndpoint.TABLETS;
      break;
    default:
      throw new Error('Error in productService');
  }

  const initArray = (await apiFetch(endpoint)) as Product[];

  return initArray.length;
}

export { getItemsAmount };
