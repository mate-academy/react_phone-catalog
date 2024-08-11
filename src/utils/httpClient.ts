import { Product } from '../shared/types/Product';
import { ProductDetails } from '../shared/types/ProductDetails';

// eslint-disable-next-line
const BASE_URL = 'https://msdreams.github.io/react_phone-catalog/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}

export function getProducts() {
  return getData<Product[]>('/products.json').then(products => products);
}

export function getPhones() {
  return getProducts().then(products =>
    products.filter(product => product.category === 'phones'),
  );
}

export function getTablets() {
  return getProducts().then(products =>
    products.filter(product => product.category === 'tablets'),
  );
}

export function getAccessories() {
  return getProducts().then(products =>
    products.filter(product => product.category === 'accessories'),
  );
}

export function getProductDetail(value: string) {
  return getData<ProductDetails[]>(`/${value}.json`).then(
    productDetails => productDetails,
  );
}
