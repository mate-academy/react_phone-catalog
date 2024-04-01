import { Product } from './Product';
import { ProductDeteils } from './ProductDeteils';

const BASE_API_URL =
  'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(BASE_API_URL))
    .then(response => response.json());
}

export async function getProductsDetails(id: string): Promise<ProductDeteils> {
  const API_PROD_DETAILS = `https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`;

  return wait(500)
    .then(() => fetch(API_PROD_DETAILS))
    .then(response => response.json());
}

export async function getHotPriceProducts(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => {
    const discauntA = prodA.fullPrice - prodA.price;
    const discauntB = prodB.fullPrice - prodB.price;

    return discauntB - discauntA;
  });
}

export async function getPhones(): Promise<Product[]> {
  const product = await getProducts();

  return product.filter(prod => prod.category === 'phones');
}

export async function getTablets(): Promise<Product[]> {
  const product = await getProducts();

  return product.filter(prod => prod.category === 'tablets');
}

export async function getAccessories(): Promise<Product[]> {
  const product = await getProducts();

  return product.filter(prod => prod.category === 'accessories');
}

export async function getBrandNewProducts(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodB.fullPrice - prodA.fullPrice);
}

export async function getNewest(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodA.year - prodB.year);
}

export async function getByName(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodA.name.localeCompare(prodB.name));
}
