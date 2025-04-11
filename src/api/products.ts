import { ProductDetail } from '../types/productDetail';
import { Product } from '../types/products';

const API_URL = 'https://dvdmsk.github.io/react_phone-catalog/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(1500).then(() =>
    fetch(`${API_URL}/products.json`).then(response => response.json()),
  );
}

export async function getPhones(): Promise<ProductDetail[]> {
  return wait(1500).then(() =>
    fetch(`${API_URL}/phones.json`).then(response => response.json()),
  );
}

export async function getTablets(): Promise<ProductDetail[]> {
  return wait(1500).then(() =>
    fetch(`${API_URL}/tablets.json`).then(response => response.json()),
  );
}

export async function getAccessories(): Promise<ProductDetail[]> {
  return wait(1500).then(() =>
    fetch(`${API_URL}/accessories.json`).then(response => response.json()),
  );
}
