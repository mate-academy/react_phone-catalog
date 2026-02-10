import { Product } from '../types/Product';
import { Category } from '../types/Category';
import axios from 'axios';

const api = axios.create({
  baseURL: '',
  timeout: 10000,
});

type ProductApiResponse = {
  id: string;
  name: string;
  category: string;
  price: number;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  capacity: string;
  ram: string;
};

type ProductDetailsApiResponse = {
  id: string;
  name: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  color: string;
  capacity: string;
};

const CATEGORIES: Record<string, Category> = {
  phones: { id: 'phones', category_name: 'phones' },
  tablets: { id: 'tablets', category_name: 'tablets' },
  accessories: { id: 'accessories', category_name: 'accessories' },
};

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get<ProductApiResponse[]>('/api/phones.json');

    const products = response.data.map(item => ({
      id: item.id,
      name: item.name,
      categoryId: item.category,
      fullPrice: item.priceRegular,
      price: item.priceDiscount,
      images: item.images,
      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
    }));

    return products;
  } catch {
    throw new Error('Error loading local products');
  }
}

export async function getCategories(): Promise<Category[]> {
  return Object.values(CATEGORIES);
}

export async function getCategoryByCatId(
  catId: string,
): Promise<Category | null> {
  try {
    return CATEGORIES[catId] || null;
  } catch {
    return null;
  }
}

export async function getProductDetails(
  prodId: string,
): Promise<ProductDetailsApiResponse | null> {
  try {
    const response = await api.get<ProductDetailsApiResponse>(
      `/_old/v2/api/products/${prodId}.json`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getProductsByCatId(catId: string): Promise<Product[]> {
  try {
    const response = await api.get<ProductApiResponse[]>(`/api/${catId}.json`);

    const products = response.data.map(item => ({
      id: item.id,
      name: item.name,
      categoryId: item.category || catId,
      fullPrice: item.priceRegular,
      price: item.priceDiscount,
      images: item.images,
      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
    }));

    return products;
  } catch {
    return [];
  }
}

export async function getProductByProdId(
  catId: string | undefined,
  prodId: string | undefined,
): Promise<Product | null> {
  if (!catId || !prodId) {
    return null;
  }

  try {
    const response = await api.get<ProductApiResponse[]>(`/api/${catId}.json`);

    const product = response.data.find(item => item.id === prodId);

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      categoryId: product.category || catId,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      images: product.images,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
    };
  } catch {
    return null;
  }
}
