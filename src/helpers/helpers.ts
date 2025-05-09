import { getProduct } from '../api/fetchClient';
import { Product } from '../types/Product';
import { ProductSpecs } from '../types/ProductSpecs';

export const fetchProducts = async (): Promise<Product[]> => {
  return getProduct<Product[]>('/api/products');
};

export const getProducts = async (catId: string): Promise<ProductSpecs[]> => {
  return getProduct<ProductSpecs[]>(`/api/${catId}`);
};

export const getNewProduct = async () => {
  const products = await fetchProducts();

  return products.sort((a, b) => b.year - a.year).slice(0, 10);
};

export const getHotProduct = async () => {
  const products = await fetchProducts();

  return products
    .map(product => ({
      ...product,
      discount: product.fullPrice - product.price,
    }))
    .sort((a, b) => b.discount - a.discount);
};

export const getCategories = async () => {
  const products = await fetchProducts();

  const categoryIds = Array.from(new Set(products.map(p => p.category)));

  const categories = categoryIds.map(cat => ({
    id: cat,
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    image: `img/category/${cat}.png`,
    products: products.filter(p => p.category === cat),
    productsCount: products.filter(p => p.category === cat).length,
  }));

  return categories;
};

export const getCategoryById = async (categoryId: string) => {
  const categories = getCategories();

  return (await categories).find(cat => cat.id === categoryId);
};

export const locateProduct = async (prodId: string, catId: string) => {
  const products = await getProducts(catId);

  return products.find((p: ProductSpecs) => p.id === prodId);
};
