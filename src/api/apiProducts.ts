import { defer } from 'react-router-dom';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ImgUrlParams } from '../types/ImgUrlParams';
import { Random } from '../types/Random';

export const BASE_URL = 'https://virass.com/phone_catalog_api';

const random: Random = require('../../node_modules/lodash/random');

const getRandomIds = (count: number) => {
  const ids = new Set<number>();

  while (ids.size < 10) {
    ids.add(random(0, count));
  }

  return Array.from(ids);
};

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(`${BASE_URL}/${url}.json`))
    .then(response => response.json());
}

export const revalidate = (
  currParam: string | undefined, nextParam: string | undefined,
) => currParam !== nextParam;

export const getImgUrl = ({
  namespaceId,
  category,
  color,
  number,
}: ImgUrlParams) => `${BASE_URL}/img/${category}/${namespaceId}/${color}/0${number}.png`;

export const getImages = (
  {
    category,
    namespaceId,
    color,
  }: Pick<ImgUrlParams, 'category' | 'namespaceId' | 'color'>,
  count: number,
) => {
  const images: string[] = [];

  for (let i = 0; i < count; i += 1) {
    images.push(getImgUrl({
      category,
      namespaceId,
      color,
      number: i,
    }));
  }

  return images;
};

const getProducts = () => {
  return request<Product[]>('products');
};

const getProduct = (id: string) => {
  return request<Product>(`products/${id}`);
};

const filterByCategory = (cat: string) => {
  return getProducts()
    .then(products => products.filter(
      ({ category }) => category === cat,
    ));
};

const removeUnavailable = () => {
  return getProducts()
    .then(products => products.filter(({ count }) => count));
};

export function mainLoader() {
  const IDs = getProducts()
    .then(products => products.map(({ productId }) => productId));

  return defer({ IDs });
}

export function homePageLoader() {
  const newProducts = removeUnavailable()
    .then(products => products.filter(({ year }) => year === 2022))
    .then(products => {
      const copy = [...products];

      const sorted = copy.sort(
        (a, b) => b.discountPrice - a.discountPrice,
      );

      return sorted.length > 10 ? sorted.slice(0, 10) : sorted;
    });

  const cheapProducts = removeUnavailable()
    .then(products => {
      const copy = [...products];

      const sorted = copy.sort(
        (a, b) => a.discountPrice - b.discountPrice,
      );

      return sorted.length > 10 ? sorted.slice(0, 10) : sorted;
    });

  const phonesCount = filterByCategory('phones')
    .then(products => products.length);

  const tabletsCount = filterByCategory('tablets')
    .then(products => products.length);

  const accessoriesCount = filterByCategory('accessories')
    .then(products => products.length);

  return defer({
    newProducts,
    cheapProducts,
    phones: phonesCount,
    tablets: tabletsCount,
    accessories: accessoriesCount,
  });
}

export function catalogPageLoader(category: Category) {
  if (!Object.values(Category).includes(category)) {
    throw new Error();
  }

  const products = filterByCategory(category);

  return defer({ products });
}

export function productDescriptionLoader(id: string | undefined) {
  if (!id) {
    throw new Error();
  }

  const namespaceId = id.split('-').slice(0, -2).join('-');

  const product = getProduct(namespaceId);

  const currentProduct = getProducts()
    .then(products => products.find(({ productId }) => productId === id))
    .then(res => {
      if (!res) {
        throw new Error();
      }

      return res;
    });

  const relatedProducts = removeUnavailable()
    .then(products => {
      const ids = getRandomIds(products.length - 1);

      return products.filter((_, i) => ids.includes(i));
    });

  return defer({ product, currentProduct, relatedProducts });
}
