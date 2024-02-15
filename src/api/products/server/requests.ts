import { calcPageIndex, productsRequest, sliceLikePaginate } from './helper';

import { ProductId, Product } from '../../../definitions/types/Product';
import { Category, SortQuery, NumericPagination } from './types';

export function fetchProductById(id: ProductId) {
  return productsRequest<Product>(`products/artificially/${id}.json`);
}

export function fetchAllProducts(category?: Category, sortQuery = SortQuery.Unsorted) {
  return productsRequest<Product[]>(`products/${sortQuery}/products.json`, category);
}

export async function fetchPaginatedProducts(
  pagination: NumericPagination,
  sortQuery?: SortQuery,
  category?: Category,
) {
  const pageIndex = calcPageIndex(pagination);
  const url = `products/${sortQuery}/page/${pageIndex}.json`;
  const products = await productsRequest<Product[]>(url, category);

  return sliceLikePaginate(products, pagination);
}

export const fetchProductsSeparately = (ids: ProductId[]) => Promise.all(
  ids.map(id => fetchProductById(id)),
);
