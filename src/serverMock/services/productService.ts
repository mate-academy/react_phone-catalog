import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import { ServerCategory, Product, ValidProdParams } from '@server/types';

async function getProduct(params: ValidProdParams): Promise<Product[]> {
  const { category, itemId } = params;

  const endpointMap = new Map([
    [ServerCategory.ACCESSORIES, ApiEndpoint.ACCESSORIES],
    [ServerCategory.PHONES, ApiEndpoint.PHONES],
    [ServerCategory.TABLETS, ApiEndpoint.TABLETS],
  ]);

  const endpoint = endpointMap.get(category);

  if (!endpoint) {
    throw new Error(`Wrong endpoint: ${endpoint}`);
  }

  return ((await apiFetch(endpoint)) as Product[]).filter(
    (el: Product) => el.namespaceId === itemId,
  );
}

export { getProduct };
