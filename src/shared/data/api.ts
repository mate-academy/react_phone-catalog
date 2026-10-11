import type { Category, Product } from '../types';

type CatalogRecord = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year: number;
  image: string;
};

type DetailRecord = Omit<Product, 'id' | 'price' | 'fullPrice' | 'image'> & {
  id: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  namespaceId: string;
};

const imagePath = (path?: string) =>
  path ? `/${path.replace(/^\//, '')}` : '';

export async function getProducts(category?: Category): Promise<Product[]> {
  const response = await fetch('api/products.json');

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  const records = (await response.json()) as CatalogRecord[];

  return records
    .filter(product => !category || product.category === category)
    .map(product => ({
      ...product,
      id: product.itemId,
      image: imagePath(product.image),
    }));
}

export async function getProductDetails(
  productId: string,
): Promise<Product | null> {
  const catalogResponse = await fetch('api/products.json');

  if (!catalogResponse.ok) {
    throw new Error('Unable to load product catalog');
  }

  const catalog = (await catalogResponse.json()) as CatalogRecord[];
  const catalogItem = catalog.find(item => item.itemId === productId);

  if (!catalogItem) {
    return null;
  }

  const detailResponse = await fetch(`/api/${catalogItem.category}.json`);

  if (!detailResponse.ok) {
    throw new Error('Unable to load product details');
  }

  const details = (await detailResponse.json()) as DetailRecord[];
  const detail = details.find(item => item.id === productId);

  if (!detail) {
    return null;
  }

  return {
    ...catalogItem,
    ...detail,
    id: detail.id,
    price: detail.priceDiscount,
    fullPrice: detail.priceRegular,
    image: imagePath(detail.images?.[0] ?? catalogItem.image),
    images: detail.images?.map(imagePath) ?? [],
  } as Product;
}

export async function getSuggestedProducts(
  currentProductId: string,
  category?: Category,
): Promise<Product[]> {
  const products = await getProducts(category);

  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
}
