import { ShopItem } from '../types/ShopItem';
import { Product } from '../types/Product';

const API_BASE_URL = '/api/';
const API_URL_PRODUCTS = '/api/products.json';

export async function getProduct(category: string, id: string): Promise<ShopItem> {
  const generetedApi = `${API_BASE_URL}${category}.json`;

  const response = await fetch(`${generetedApi}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ShopItem[]  = await response.json();

  const product: ShopItem | undefined = data.find(
    (product: ShopItem) => product.id === id,
  );

  if (!product) {
    throw new Error(`Product not found`);
  }
  return product;
}

export function getProducts(): Promise<Product[]> {
  return fetch(`${API_URL_PRODUCTS}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });
}

// export function getTablets(): Promise<ShopItem[]> {
//   return fetch(`${API_URL_TABLETS}`).then(res => {
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return res.json();
//   });
// }



// export function getAccessories(): Promise<ShopItem[]> {
//   return fetch(`${API_URL_ACCESSORIES}`).then(res => {
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return res.json();
//   });
// }
