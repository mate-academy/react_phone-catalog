import { formError } from '@server/helpers';
import { products } from '@server/static';
import {
  ProcessingResult,
  Product,
  ProductCategory,
  ValidAmountBody,
  ValidProdBody,
} from '@server/types';

function getProduct(body: ValidProdBody): ProcessingResult<Product> {
  const { itemId } = body;

  const product = products.filter(el => el.id === itemId);

  if (product.length === 0) {
    return formError(404, 'Requested item does not exist');
  }

  return {
    ok: true,
    data: product[0],
  };
}

function getAmount(body: ValidAmountBody): ProcessingResult<number> {
  const { category } = body;

  const length =
    category === ProductCategory.ALL
      ? products.length
      : products.filter(el => el.category === category).length;

  return {
    ok: true,
    data: length,
  };
}

export { getProduct, getAmount };
