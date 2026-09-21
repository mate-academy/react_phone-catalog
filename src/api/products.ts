import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export async function getProducts(): Promise<Product[]> {
  await wait(300);
  const response = await fetch('./api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await getProducts();

  return products.filter(product => product.category === category);
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  await wait(300);

  const categories = ['phones', 'tablets', 'accessories'];

  for (let i = 0; i < categories.length; i = i + 1) {
    const category = categories[i];

    try {
      const response = await fetch(`./api/${category}.json`);

      if (response.ok) {
        const items: ProductDetails[] = await response.json();
        const found = items.find(item => item.id === productId);

        if (found) {
          return found;
        }
      }
    } catch {
      // ігноруємо помилку та шукаємо у наступній категорії
    }
  }

  return null;
}

export async function getSuggestedProducts(): Promise<Product[]> {
  const products = await getProducts();

  return [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
}
