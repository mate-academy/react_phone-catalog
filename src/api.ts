import { Product } from './types/Product';
import { ProductCategory, ProductDetails } from './types/ProductDetails';

const API_URL = `${import.meta.env.BASE_URL}api/`;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}products.json`))
    .then(response => response.json());
}

// export const getProductsByCategory = (
//   category: ProductCategory,
// ): ProductDetails[] => {
//   switch (category) {
//     case 'phones':
//       return phones as ProductDetails[];

//     case 'tablets':
//       return tablets as ProductDetails[];

//     case 'accessories':
//       return accessories as ProductDetails[];

//     default:
//       return [];
//   }
// };

export async function getProductByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}products.json`))
    .then(response => response.json())
    .then((products: Product[]) =>
      products.filter(p => p.category === category),
    );
}

export async function getProductsDetails(
  category: string,
): Promise<ProductDetails[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}${category}.json`))
    .then(r => r.json());
}
