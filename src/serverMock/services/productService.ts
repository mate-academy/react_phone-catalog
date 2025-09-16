import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import {
  Product,
  ServerCategory,
  ValidAmountParams,
  ValidProdParams,
} from '@server/types';

async function getProduct(params: ValidProdParams): Promise<Product | null> {
  const { itemId } = params;

  const product = ((await apiFetch(ApiEndpoint.ITEMS)) as Product[]).filter(
    (el: Product) => el.id === itemId,
  );

  if (product.length === 0) {
    return null;
  }

  return product[0];
}

async function getAmount(params: ValidAmountParams): Promise<number> {
  const initArray = (await apiFetch(ApiEndpoint.ITEMS)) as Product[];

  return params.category === ServerCategory.ALL
    ? initArray.length
    : initArray.filter(el => el.category === params.category).length;
}

export { getProduct, getAmount };
