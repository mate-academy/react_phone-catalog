import { Product } from './Product';
import { ProductDeteils } from './ProductDeteils';

const BASE_API_URL = 'api/products.json';

export async function getProducts(): Promise<Product[]> {
  return fetch(BASE_API_URL).then(response => response.json());
}

export async function getSuggestedProducts(
  category: string,
  id: string,
): Promise<ProductDeteils> {
  const API_PROD_DETAILS = `api/${category}.json`;
  const product = fetch(API_PROD_DETAILS).then(response => response.json());
  const productDeteils = await product;

  return productDeteils.find((prod: { id: string }) => prod.id === id);
}

export async function getHotPriceProducts(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => {
    const discauntA = prodA.fullPrice - prodA.price;
    const discauntB = prodB.fullPrice - prodB.price;

    return discauntB - discauntA;
  });
}

export async function getProduct(category: string): Promise<Product[]> {
  const product = await getProducts();

  return product.filter(prod => prod.category === category);
}

export async function getBrandNewProducts(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodB.fullPrice - prodA.fullPrice);
}

export async function getNewest(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodB.year - prodA.year);
}

export async function getByName(): Promise<Product[]> {
  const product = await getProducts();

  return product.sort((prodA, prodB) => prodA.name.localeCompare(prodB.name));
}
