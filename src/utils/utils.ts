import productsFromJson from "../../public/api/products.json";
import phonesFromJson from "../../public/api/phones.json";
import accessoriesFromJson from "../../public/api/accessories.json";
import tabletsFromJson from "../../public/api/tablets.json";
import { Category, Product, ProductDetailsType, Sort } from "../types/types";

export function getProducts() {
  return productsFromJson;
}

export async function getAccessories(): Promise<ProductDetailsType[]> {
  return Promise.resolve(accessoriesFromJson);
}

export async function getPhones(): Promise<ProductDetailsType[]> {
  return Promise.resolve(phonesFromJson);
}

export async function getTablets(): Promise<ProductDetailsType[]> {
  return Promise.resolve(tabletsFromJson);
}

type Keys = "cartIds" | "favoritesIds";

interface ProductId {
  id: number;
  count: number;
}

export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): (...args: T) => void {
  let timerId = 0;

  return (...arg: T) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...arg);
    }, delay);
  };
}

function getProductIds(key: Keys): Array<ProductId> | [] {
  try {
    const data = localStorage.getItem(key) || "[]";

    return JSON.parse(data);
  } catch (_error) {
    localStorage.removeItem(key);

    return [];
  }
}

function saveProductIds(
  key: Keys,
  value: Array<{ id: number; count: number }>,
) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_error) {
    return;
  }
}

export function getCartIds() {
  return getProductIds("cartIds");
}

export function getFavoritesIds() {
  return getProductIds("favoritesIds");
}

export function saveCartIds(value: ProductId[]) {
  return saveProductIds("cartIds", value);
}

export function saveFavoritesIds(value: ProductId[]) {
  return saveProductIds("favoritesIds", value);
}

type Options = {
  products: Array<Product>;
  category?: Category | null;
  sort?: Sort | null;
};

export function filterAndSort({
  products,
  category,
  sort,
}: Options): Array<Product> {
  const filtered: Product[] = category
    ? products.filter(item => item.category === category)
    : products;

  switch (sort) {
    case Sort.Cheapest:
      return [...filtered].sort((a, b) => a.price - b.price);
    case Sort.Newest:
      return [...filtered].sort((a, b) => b.year - a.year);
    case Sort.Alphabet:
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    default:
      return filtered;
  }
}

export function selectProductsByCategory(options: Options) {
  return filterAndSort(options);
}

export const getShortPagination = (
  currentPage: number,
  totalPages: number,
): number[] => {
  const pages: number[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 6; i++) {
        pages.push(i);
      }

      pages.push(totalPages);
    } else if (currentPage + 3 >= totalPages) {
      pages.push(1);
      for (let i = totalPages - 5; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }

      pages.push(totalPages);
    }
  }

  return [...pages];
};

export function getCount(ids: Array<{ id: number; count: number }>) {
  return ids.reduce((total, cur) => cur.count + total, 0);
}

export function getAssetPath(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;

  return `${import.meta.env.BASE_URL}${normalized}`;
}
