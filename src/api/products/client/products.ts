import { ProductId } from '../../../definitions/types/Product';
import { paginateProducts, sortProducts } from "../server/helper";
import { getIdsToFetch, needSeparatelyFetching } from "../server/helper";
import { fetchProductsSeparately } from "../server/requests";
import { ServerResponse } from "../server/types";
import { QueryOptions } from "../server/types";
import { fetchWithPaginationOrWithout } from "../server/helper";

export function getProducts(options: QueryOptions = {}): Promise<ServerResponse> {
  if (needSeparatelyFetching(options)) {
    return getProductsSeparately(options);
  }

  return getProductsAllAtOnce(options);
};

async function getProductsSeparately(options: QueryOptions): Promise<ServerResponse> {
  const idsToFetch = getIdsToFetch(options);
  const products = await getProductsByIds(idsToFetch, options);

  return {
    products,
    amount: idsToFetch.length,
  };
}

async function getProductsAllAtOnce(options: QueryOptions): Promise<ServerResponse> {
  const products = await fetchWithPaginationOrWithout(options); 

  return {
    products,
    amount: products.length
  };
}

async function getProductsByIds(ids: ProductId[], options: QueryOptions) {
  const { sortQuery, pagination } = options;
  const products = await fetchProductsSeparately(ids);

  if (sortQuery) {
    sortProducts(products, sortQuery);
  }

  return paginateProducts(products, pagination);
}
