import { apiFetch } from '@server/helpers';
import { CategoryParams, ValidProdParams } from '@server/serverMock';
import { ApiEndpoint } from '@server/static';

async function getProduct(params: ValidProdParams) {
  let selector;
  const { category, itemId } = params;

  switch (category) {
    case CategoryParams.ACCESSORIES:
      selector = ApiEndpoint.ACCESSORIES;
      break;
    case CategoryParams.PHONES:
      selector = ApiEndpoint.PHONES;
      break;
    case CategoryParams.TABLETS:
      selector = ApiEndpoint.TABLETS;
      break;
    default:
      return false;
  }

  const data = await apiFetch(selector as ApiEndpoint);

  return data.filter(el => el.namespaceId === itemId);
}

export { getProduct };
