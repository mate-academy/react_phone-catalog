import { Category } from '../types/CategoryType';
import { ProductType } from '../types/ProductType';
import { SortType } from '../types/SortType';

const apiBase = `http://localhost:5173/api`;
const productsJson = `${apiBase}/products.json`;

interface Options {
  perPage?: number;
  page?: number;
  sortBy?: SortType;
  filter?: string;
}

const getData = async (jsonPath: string): Promise<ProductType[]> => {
  const response = await fetch(jsonPath);

  return response.json();
};

const sortProducts = (
  products: ProductType[],
  sortBy?: SortType,
): ProductType[] => {
  if (sortBy === SortType.Discount) {
    return products.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }

  if (sortBy === SortType.Oldest) {
    return products.sort((a, b) => a.year - b.year);
  }

  return products.sort((a, b) => b.year - a.year);
};

const filterProductsByCategory = (
  products: ProductType[],
  category?: Category,
): ProductType[] => {
  if (!category) {
    return products;
  }

  return products.filter(product => product.category === category.toString());
};

const limitProducts = (
  products: ProductType[],
  perPage: number = 16,
  page: number = 1,
): ProductType[] => {
  const startIndex = perPage * (page - 1);
  const endIndex = startIndex + perPage;

  console.log(startIndex, endIndex);

  return products.slice(startIndex, endIndex);
};

const countPages = (productsCount: number, perPage: number = 16) => {
  return Math.ceil(productsCount / perPage);
};

export const getProducts = async (
  options: Options = { perPage: 16 },
  category?: Category,
): Promise<{ products: ProductType[]; pages: number }> => {
  let products = await getData(productsJson);

  products = filterProductsByCategory(products, category);
  products = sortProducts(products, options.sortBy);

  const pages = countPages(products.length, options.perPage);
  products = limitProducts(products, options.perPage, options.page);

  return { products, pages };
};
