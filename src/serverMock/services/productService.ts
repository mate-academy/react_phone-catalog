import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import { CategoryParams, Product, ValidProdParams } from '@server/types';

async function getProduct(params: ValidProdParams): Promise<Product[]> {
  let endpoint;
  const { category, itemId } = params;

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

  return ((await apiFetch(endpoint)) as Product[]).filter(
    (el: Product) => el.namespaceId === itemId,
  );
}

export { getProduct };
