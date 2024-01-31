import { Category } from "../../definitions/enums/Api";
import { ProductDetails } from "../../definitions/types/ProductDetails";
import { request } from "../../utils/fetchHelper";

export const getProductDetailsById = (
  category: Category,
  productId: string
): Promise<ProductDetails> => {
  const url = `categories/${category}/products_details/${productId}.json`;

  return request<ProductDetails>(url);
};

export const getVariantsOfProduct = async (
  category: Category,
  product: ProductDetails
) => {
  const {
    colorsAvailable: colors,
    capacityAvailable: capacities,
    namespaceId: baseId,
  } = product;
  const productsIds = [];

  for (const color of colors) {
    for (const capacity of capacities) {
      productsIds.push(`${baseId}-${capacity.toLowerCase()}-${color}`);
    }
  }

  try {
    const products = await Promise.all(
      productsIds.map(id => getProductDetailsById(category, id))
    );

    return products;
  } catch (error) {
    throw error;
  }
};