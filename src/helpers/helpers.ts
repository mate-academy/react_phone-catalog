import { Product } from '../types/Product';

export const getUrlData = (urlPart: string) => {
  const name = urlPart.match(/(iphone-\d+|iPad-\d+.\d+)/g);
  const model = urlPart.match(/pro-max|pro|plus/g);
  const color = urlPart.match(
    /pacific-blue|graphite|gold|deep-purple|silver|space-black|space-gray|red/g,
  );
  const capacity = urlPart.match(/128GB|256GB|512GB|1TB/g);

  if (name && model && color && capacity) {
    return {
      name: name[0],
      model: model[0],
      color: color[0],
      capacity: capacity[0],
    };
  }

  return null;
};

export const getSalePrice = (price: number, discount: number) => {
  return Math.ceil(price - ((price * discount) / 100));
};

export function saveToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
):
  (...args: T) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
}

export function countProducts(type: string, products: Product[]) {
  return products.reduce((total, curr) => {
    if (curr.type === type) {
      return total + 1;
    }

    return total;
  }, 0);
}

export function getGoodsLink(
  type: string,
  name: string,
  model: string,
  color: string,
  capacity: string,
): string {
  const productType = type === 'tablet' ? 'tablets' : 'phones';

  return `/${productType}/${name}-${model}-${color}-${capacity}`;
}

export function getPages(amount: number) {
  const pages = [];

  for (let i = 1; i <= amount; i += 1) {
    pages.push(i);
  }

  return pages;
}
