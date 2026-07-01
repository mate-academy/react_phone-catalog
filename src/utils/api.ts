import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const getBaseUrl = () => {
  const pathname = window.location.pathname;
  let base = pathname;

  if (base.endsWith('index.html')) {
    base = base.substring(0, base.lastIndexOf('/'));
  }

  if (!base.endsWith('/')) {
    base += '/';
  }

  return `${base}api`;
};

const BASE_URL = getBaseUrl();

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function getPhones(): Promise<ProductDetails[]> {
  const response = await fetch(`${BASE_URL}/phones.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch phones');
  }

  return response.json();
}

export async function getTablets(): Promise<ProductDetails[]> {
  const response = await fetch(`${BASE_URL}/tablets.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch tablets');
  }

  return response.json();
}

export async function getAccessories(): Promise<ProductDetails[]> {
  const response = await fetch(`${BASE_URL}/accessories.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch accessories');
  }

  return response.json();
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  const products = await getProducts();
  const product = products.find(p => p.itemId === productId);

  if (!product) {
    return null;
  }

  const category = product.category;
  let details: ProductDetails[] = [];

  if (category === 'phones') {
    details = await getPhones();
  } else if (category === 'tablets') {
    details = await getTablets();
  } else if (category === 'accessories') {
    details = await getAccessories();
  }

  const detail = details.find(d => d.id === productId);

  return detail || null;
}
