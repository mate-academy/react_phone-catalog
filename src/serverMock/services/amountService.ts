import { apiFetch } from '@server/helpers';
import { endpointMap } from '@server/static';
import { ValidAmountParams } from '@server/types';

async function getItemsAmount(params: ValidAmountParams): Promise<number> {
  const category = params.category;
  const endpoint = endpointMap.get(category);

  if (!endpoint) {
    throw new Error(`Wrong endpoint: ${endpoint}`);
  }

  const initArray = await apiFetch(endpoint);

  return initArray.length;
}

export { getItemsAmount };
