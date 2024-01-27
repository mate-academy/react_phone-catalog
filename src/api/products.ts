import { client } from '../utils/httpClient';
import { Product, ProductCategory, ProductPrecise } from '../types/Product';

export function getProducts(): Promise<Product[]> {
  return client.get('products.json');
}

export function getProductPrecise(productId: string): Promise<ProductPrecise> {
  return client.get(`products/${productId}.json`);
}

export function getProductByItemId(
  products: Product[],
  productItemId: Product['itemId'],
) {
  return products.find(item => item.itemId === productItemId);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.price && product.fullPrice)
    .sort((a, b) => {
      const bAbsDiscount = Math.abs(b.fullPrice - b.price);
      const aAbsDiscount = Math.abs(a.fullPrice - a.price);

      return bAbsDiscount - aAbsDiscount;
    });
}

export function getBrandNewProducts(products: Product[]): Product[] {
  return products
    .filter(product => product.price && product.fullPrice)
    .sort((a, b) => b.price - a.price);
}

function getProductsByCategory(products: Product[], category: ProductCategory) {
  return products.filter(p => p.category === category);
}

export function getPhones(products: Product[]) {
  return getProductsByCategory(products, ProductCategory.Phones);
}

export function getTablets(products: Product[]) {
  return getProductsByCategory(products, ProductCategory.Tablets);
}

export function getAccessories(products: Product[]) {
  return getProductsByCategory(products, ProductCategory.Accessories);
}
