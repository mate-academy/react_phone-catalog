import { Category } from '../types/Category';
import { ProductSummary } from '../types/ProductSummary';

export async function getProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts<ProductSummary[]>('/api/products.json');
  const phones = products.filter(p => p.category === 'phones');
  const tablets = products.filter(p => p.category === 'tablets');
  const accessories = products.filter(p => p.category === 'accessories');

  return [
    {
      id: 'phones',
      title: 'Mobile phones',
      bannerImg: 'public/img/category-phones-sqr.png',
      products: phones,
      productsCount: phones.length,
    },
    {
      id: 'tablets',
      title: 'Tablets',
      bannerImg: 'public/img/category-tablets-sqr.png',
      products: tablets,
      productsCount: tablets.length,
    },
    {
      id: 'accessories',
      title: 'Accessories',
      bannerImg: 'public/img/category-accessories-sqr.png',
      products: accessories,
      productsCount: accessories.length,
    },
  ];
}
