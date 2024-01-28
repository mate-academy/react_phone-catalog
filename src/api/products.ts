import { Category } from "../definitions/enums/Category";
import { Product } from '../definitions/types/Product';
import { ProductDetails } from "../definitions/types/ProductDetails";
import { request } from '../utils/fetchHelper';

export const getProducts = (category: Category) => {
  return request<Product[]>(`categories/${category}/products.json`);
};

export const getProductsByPage = (
  category: Category,
  { page, perPage }: { page: number, perPage: number }
) => {
  const PER_PAGE_ON_SERVER = 16;
  const pageIndex = Math.ceil((page * perPage) / PER_PAGE_ON_SERVER);

  return request<Product[]>(`categories/${category}/page/${pageIndex}.json`)
};

export const getProductsAmount = (category: Category) => {
  return request<number>(`categories/${category}/amount.json`);
};

export const getProductById = (category: Category, productId: string): Promise<ProductDetails> => {
  const url = `categories/${category}/products/${productId}.json`;

  return request<ProductDetails>(url);
};

export const getSimilarProducts = async (
  category: Category,
  product: ProductDetails
) => {
  const colors = product.colorsAvailable;
  const capacities = product.capacityAvailable;
  const baseId = product.namespaceId;
  const productsIds = [];

  for (const color of colors) {
    for (const capacity of capacities) {
      productsIds.push(`${baseId}-${capacity.toLowerCase()}-${color}`);
    }
  }

  try {
    const products = await Promise.all(
      productsIds.map(id => getProductById(category, id))
    );

    return products;
  } catch (error) {
    throw error;
  }
};
