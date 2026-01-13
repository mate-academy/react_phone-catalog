import { Category } from '@/types/Category';
import { FetchOptions } from '@/types/FetchOptions';
import {
  Product,
  ProductDetails,
  ProductDetailsWithArticle,
} from '@/types/Product';
import { client } from '@/utils/fetchClient';

export function getProducts(options: FetchOptions = {}) {
  return client.get<Product[]>('products.json', options);
}

export function getProductsByCategory(
  category: Category,
  options: FetchOptions = {},
) {
  return client
    .get<Product[]>('products.json', options)
    .then(res => res.filter(item => item.category === category));
}

export function getProductsByQuery(
  query: string,
  quantity: number = 10,
  options: FetchOptions = {},
) {
  return client
    .get<Product[]>('products.json', options)
    .then(res =>
      res
        .filter(item =>
          item.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, quantity),
    );
}

export async function getProductsByIds(
  productsIds: Product['id'][],
  options: FetchOptions = {},
) {
  const products = await getProducts(options);

  return products.filter(pr => productsIds.includes(pr.id));
}

export async function getProductById(
  id: Product['itemId'],
  options: FetchOptions = {},
): Promise<ProductDetailsWithArticle | undefined> {
  const products = await getProducts(options);

  const product = products.find(item => item.itemId === id);

  if (!product) {
    return undefined;
  }

  const productsByCategory = await client.get<ProductDetails[]>(
    `/${product.category}.json`,
    options,
  );

  const detailedProduct = productsByCategory.find(item => item.id === id);

  if (detailedProduct) {
    return {
      ...detailedProduct,
      article: product.id,
    };
  }

  return;
}
