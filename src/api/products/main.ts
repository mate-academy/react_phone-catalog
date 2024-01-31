import { Category, SortQuery } from "../../definitions/enums/Api";
import { Product, ProductId } from '../../definitions/types/Product';
import { request } from '../../utils/fetchHelper';
import productsIds from '../../assets/product_ids_DB.json';
import { sortProducts } from "../../utils/servicesHelper";

interface Options {
  category: Category,
  page: number,
  perPage: number | 'All',
  sortQuery?: SortQuery,
  search?: string | null,
}

export function productsRequest<T>(category: Category, url: string) {
  return request<T>(`categories/${category}/products/${url}`)
}

export const getAllProducts = (category: Category, sortQuery: SortQuery) => {
  return productsRequest<Product[]>(category, `${sortQuery}/products.json`);
};

async function getProductById(category: Category, id: ProductId) {
  return productsRequest<Product>(category, `artificially/${id}.json`);
}

async function getProductsWithSearch({
  category,
  page,
  perPage,
  search,
  sortQuery = SortQuery.Unsorted,
}: Required<Options>) {
  if (search === null) {
    throw Error(`Fix code, search can't be null here`);
  }

  const idsToFetch = productsIds.filter(id => {
    const name = id.replaceAll('-', ' ');

    return name.includes(search.toLocaleLowerCase());
  });

  try {
    const productsFromServer = await Promise.all(
      idsToFetch.map(id => getProductById(category, id))
    );
    sortProducts(productsFromServer, sortQuery);

    if (perPage === 'All') return { products: productsFromServer };

    const startSlice = (page - 1) * perPage;
    const endSlice = startSlice + perPage;

    return {
      products: productsFromServer.slice(startSlice, endSlice),
      amount: productsFromServer.length,
    };
  } catch (error) {
    throw error;
  }
}

async function getProductsWithoutSearch(
  { category, page, perPage, sortQuery = SortQuery.Unsorted }: Options
) {
  if (perPage === 'All') return {
    products: await getAllProducts(category, sortQuery),
  };

  const PER_PAGE_ON_SERVER = 16;
  const pageIndex = Math.ceil((page * perPage) / PER_PAGE_ON_SERVER);

  try {
    const productsFromServer = await productsRequest<Product[]>(
      category, `${sortQuery}/page/${pageIndex}.json`
    );

    const pageStart = (perPage * (page - 1)) % PER_PAGE_ON_SERVER;
    const pageEnd = Math.min(pageStart + perPage, productsFromServer.length);

    return {
      products: productsFromServer.slice(pageStart, pageEnd)
    };
  } catch (error) {
    throw error;
  }
}

type ReturnType = Promise<{ products: Product[], amount?: number }>;

export function getProducts(options: Options): ReturnType {
  if (options.search) {
    return getProductsWithSearch(options as Required<Options>);
  }

  return getProductsWithoutSearch(options);
};
