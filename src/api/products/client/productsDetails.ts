import { Category } from '../server/types';
import { ProductDetails } from '../../../definitions/types/ProductDetails';
import { productsRequest } from '../server/helper';

export const getProductDetailsById = (
  productId: string,
  category?: Category,
): Promise<ProductDetails> => {
  return productsRequest<ProductDetails>(
    `products_details/${productId}.json`, category,
  );
};

export const getVariantsOfProduct = async (
  product: ProductDetails,
  category?: Category,
) => {
  const {
    colorsAvailable: colors,
    capacityAvailable: capacities,
    namespaceId: baseId,
  } = product;
  const productsIds = colors.map(
    color => capacities.map(capacity => `${baseId}-${capacity.toLowerCase()}-${color}`),
  ).flat();

  const products = await Promise.all(
    productsIds.map(id => getProductDetailsById(id, category)),
  );

  return products;
};
