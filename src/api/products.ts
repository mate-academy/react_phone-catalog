import { Category, SortQuery } from "../definitions/enums/api";
import { Product } from '../definitions/types/Product';
import { ProductDetails } from "../definitions/types/ProductDetails";
import { request } from '../utils/fetchHelper';

export const getAllProducts = (category: Category, sortQuery: SortQuery) => {
  const url = `categories/${category}/products/${sortQuery}/products.json`;

  return request<Product[]>(url);
};

interface Options {
  page: number,
  perPage: number | 'All',
  sortQuery?: SortQuery,
}

export const getProducts = async (
  category: Category,
  { page, perPage, sortQuery = SortQuery.Unsorted }: Options
) => {
  console.log(sortQuery);
  if (perPage === 'All') return getAllProducts(category, sortQuery);

  const PER_PAGE_ON_SERVER = 16;
  const pageIndex = Math.ceil((page * perPage) / PER_PAGE_ON_SERVER);

  try {
    const productsFromServer = await request<Product[]>(
      `categories/${category}/products/${sortQuery}/page/${pageIndex}.json`
    );

    const pageStart = (perPage * (page - 1)) % PER_PAGE_ON_SERVER;
    const pageEnd = Math.min(pageStart + perPage, productsFromServer.length);

    return productsFromServer.slice(pageStart, pageEnd);
  } catch (error) {
    throw error;
  }
};

export const getProductsAmount = (category: Category) => {
  return request<number>(`categories/${category}/amount.json`);
};

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
