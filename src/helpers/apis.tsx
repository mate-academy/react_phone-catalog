import { FetchedProduct } from './types/FetchedProduct';
import { Product } from './types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getPhones(address: string): Promise<Product[]> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json());
}

export function getTablets(address: string) {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json())
    .then((products: any) => products.filter(
      (product: any) => product.type === 'tablet',
    ));
}

export function getAccessories(address: string) {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json())
    .then((products: any) => products.filter(
      (product: any) => product.type === 'accessories',
    ));
}

export function getHotPriceProducts<T>(address: string): Promise<T> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json())
    .then((data: any) => {
      const discountedProducts = data.filter(
        (product: any) => product.price && product.fullPrice,
      );

      const modifiedProducts = discountedProducts.map((product: any) => {
        const price = parseFloat(product.price);
        const fullPrice = parseFloat(product.fullPrice);
        const discount = fullPrice - price;

        return {
          ...product,
          discount,
          absoluteDiscount: Math.abs(discount),
        };
      });

      modifiedProducts.sort(
        (a: any, b: any) => b.absoluteDiscount - a.absoluteDiscount,
      );

      return modifiedProducts.slice(0, 10);
    });
}

export function getBrandNewProducts<T>(address: string): Promise<T> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json())
    .then((data: any) => {
      const brandNewProducts = data;

      brandNewProducts.sort(
        (a: any, b: any) => b.price - a.price,
      );

      return brandNewProducts.slice(0, 10);
    });
}

export function getProductByProductId(
  productId: string,
): Promise<FetchedProduct | null> {
  if (!productId) {
    return Promise.resolve(null);
  }

  const productAddress = `products/${productId}.json`;

  return wait(300)
    .then(() => fetch(`${BASE_URL}${productAddress}`))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return response.json();
    })
    .then((product: FetchedProduct) => product);
}

export function getSuggestedProducts<T>(
  address: string, id: string,
): Promise<T> {
  return wait(300)
    .then(() => fetch(`${BASE_URL}${address}`))
    .then(response => response.json())
    .then((data: any) => {
      const ourProductIndex = data.findIndex(
        (prod: any) => (prod.phoneId === id),
      );

      if (ourProductIndex === -1) {
        throw new Error('Product not found in the data');
      }

      let startIndex = Math.max(0, ourProductIndex - 4);

      let endIndex = Math.min(data.length - 1, ourProductIndex + 5);

      if (startIndex < 3) {
        endIndex += (3 - startIndex);
      }

      if (endIndex < (ourProductIndex + 4)) {
        startIndex -= ((ourProductIndex + 4) - endIndex);
      }

      const suggestedProducts = data.slice(startIndex, endIndex + 1);

      return suggestedProducts;
    });
}
