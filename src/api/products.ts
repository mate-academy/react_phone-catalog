import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export function getProducts() {
  return getData<Product[]>('/products.json').then(products => products);
}

export function getHotPriceProducts() {
  return getProducts().then(products =>
    products.sort(
      (product1, product2) =>
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price),
    ),
  );
}

export function getBrandNewProducts() {
  return getProducts().then(products =>
    products.sort(
      (product1, product2) => product2.fullPrice - product1.fullPrice,
    ),
  );
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
  return getData<ProductDetails>(`/products/${value}.json`).then(
    productDetails => productDetails,
  );
}

export function getSuggestedProducts() {
  return getProducts().then(suggestedProducts =>
    suggestedProducts.sort(() => Math.random() - 0.5),
  );
}
