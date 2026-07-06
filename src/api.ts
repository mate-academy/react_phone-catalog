import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';
import { ProductType } from './types/ProductType';

const API = '/api/products.json';

export function getProducts(
  type: ProductType = ProductType.All,
): Promise<Product[]> {
  return fetch(API)
    .then(response => response.json())
    .then((products: Product[]) =>
      products.filter(product => {
        if (type !== ProductType.All) {
          return product.category === type;
        }

        return true;
      }),
    );
}

export function getProductDetails(
  type: ProductType,
  id: string,
): Promise<ProductDetails | undefined> {
  const API_TYPE = `/api/${type}.json`;

  return fetch(API_TYPE)
    .then(response => response.json())
    .then((products: ProductDetails[]) =>
      products.find(product => product.id === id),
    );
}

export function getSuggestedProducts(): Promise<Product[]> {
  const randomArr: Product[] = [];
  const amountOfProducts = 10;

  return fetch(API)
    .then(response => response.json())
    .then((products: Product[]) => {
      while (
        randomArr.length < amountOfProducts &&
        randomArr.length < products.length
      ) {
        const randomIndex = Math.floor(Math.random() * products.length);

        if (!randomArr.includes(products[randomIndex])) {
          randomArr.push(products[randomIndex]);
        }
      }

      return randomArr;
    });
}
