import { Product, ProductCategory } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

function fetchJson<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }

    return response.json();
  });
}

export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>('./api/products.json');
}

export function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  return getProducts().then(products =>
    products.filter(product => product.category === category),
  );
}

// короткая карточка по строковому id (itemId в products.json === id в деталях)
export function getProductByItemId(itemId: string): Promise<Product | null> {
  return getProducts().then(
    products => products.find(product => product.itemId === itemId) ?? null,
  );
}

// подробности лежат в файле своей категории: /api/phones.json и т.д.
export function getProductDetails(
  category: ProductCategory,
  id: string,
): Promise<ProductDetails | null> {
  return fetchJson<ProductDetails[]>(`./api/${category}.json`).then(
    items => items.find(item => item.id === id) ?? null,
  );
}

// случайные товары для блока "You may also like"
export function getSuggestedProducts(count: number): Promise<Product[]> {
  return getProducts().then(products =>
    [...products].sort(() => Math.random() - 0.5).slice(0, count),
  );
}
