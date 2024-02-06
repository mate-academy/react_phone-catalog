import { Category, NumericPagination, Pagination, SortQuery } from "./types";
import { request } from "../../../utils/fetchHelper";
import productsIds from '../../../assets/product_ids.json';
import { Product, ProductId } from "../../../definitions/types/Product";
import { QueryOptions } from "./types";
import { fetchPaginatedProducts, fetchAllProducts } from "./requests";
import { PER_PAGE_ON_SERVER } from "./constants";

export const needSeparatelyFetching = (options: QueryOptions) => (
  options.search || options.ids || options.randomCount
);

export function productsRequest<T>(url: string, category?: Category) {
  if (category) {
    return request<T>(`products/categories/${category}/${url}`);
  }

  return request<T>(`products/all/${url}`);
}

let memoizedFlattenArray: string[];

function getAllCategoriesIds() {
  if (memoizedFlattenArray) {
    return memoizedFlattenArray;
  }

  const flattenIdsArray = [];

  for (const categoryIds of Object.values(productsIds)) {
    flattenIdsArray.push(...categoryIds);
  }

  memoizedFlattenArray = flattenIdsArray;

  return flattenIdsArray;
}

function getRandomIds(count?: number) {
  if (!count) {
    return [];
  }

  let randomLeft = count;
  const ids = [...getAllCategoriesIds()];
  const randomIds = [];

  
  while (randomLeft > 0 && ids.length > 0) {
    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomId = ids[randomIndex];
    
    ids.splice(randomIndex, 1);
    randomIds.push(randomId);

    randomLeft--;
  }

  return randomIds;
}

export function getIdsToFetch(options: QueryOptions) {
  const { category, search, ids: customIds = [], randomCount } = options;
  const randomIds = getRandomIds(randomCount);
  let ids = [];

  if (randomIds.length > 0 || customIds.length > 0) {
    ids.push(...customIds);
    ids.push(...randomIds);
  } else {
    ids = getAllIds(category);
  }

  if (!search) {
    return ids;
  }

  return ids.filter(id => {
    const name = id.replaceAll('-', ' ');

    return name.includes(search.toLocaleLowerCase());
  });
}

const getAllIds = (category?: Category) => (
  category ? productsIds[category] : Object.values(productsIds)
) as ProductId[];


export const calcPageIndex = ({ page, perPage }: NumericPagination) => {
  return Math.ceil((page * perPage) / PER_PAGE_ON_SERVER);
}

export function sliceLikePaginate(products: Product[], { page, perPage }: NumericPagination) {
  const pageStart = (perPage * (page - 1)) % PER_PAGE_ON_SERVER;
  const pageEnd = Math.min(pageStart + perPage, products.length);

  return products.slice(pageStart, pageEnd);
};

export function fetchWithPaginationOrWithout(options: QueryOptions) {
  const { category, sortQuery = SortQuery.Unsorted, pagination } = options;
  const needPagination = pagination && pagination.perPage !== 'All';

  if (needPagination) {
    return fetchPaginatedProducts(pagination as NumericPagination, sortQuery, category);
  }

  return fetchAllProducts(category, sortQuery);
}

/**
 * Sort Products with mutation
 */

export const sortProducts = (products: Product[], sortQuery: SortQuery) => {
  switch (sortQuery) {
    case SortQuery.Unsorted: return products;
    case SortQuery.Alphabet: {
      return products.sort((product1, product2) => (
        product1.name.localeCompare(product2.name)
      ));
    }
    case SortQuery.Newest: {
      return products.sort((product1, product2) => (
        product2.year - product1.year
      ));
    }
    case SortQuery.Cheapest: {
      return products.sort((product1, product2) => (
        product1.price - product2.price
      ));
    }
  }
};

export const paginateProducts = (products: Product[], pagination?: Pagination) => {
  if (!pagination) {
    return products;
  }

  const { page, perPage } = pagination;

  if (perPage === 'All') {
    return products;
  }

  const startSlice = (page - 1) * perPage;
  const endSlice = startSlice + perPage;

  return products.slice(startSlice, endSlice);
};
