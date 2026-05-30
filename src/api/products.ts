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
  namespaceId?: string;
  category?: string;
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
  priceRegular?: number;
  priceDiscount?: number;
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
  category?: string,
): Promise<ProductDetailsApiResponse | null> {
  try {
    // Para phones, usa a API antiga com detalhes completos
    if (!category || category === 'phones') {
      const response = await api.get<ProductDetailsApiResponse>(
        `/_old/v2/api/products/${prodId}.json`,
      );

      return response.data;
    }

    // Para tablets e accessories, busca da lista e monta o objeto de detalhes
    const response = await api.get<ProductApiResponse[]>(
      `/api/${category}.json`,
    );
    const product = response.data.find(item => item.id === prodId);

    if (!product) {
      return null;
    }

    // Extrai namespaceId do prodId
    // Ex: "apple-ipad-pro-11-2021-128gb-spacegray"
    // Precisamos remover a capacidade e a cor do final
    const parts = product.id.split('-');

    // Remove as últimas 2 partes (capacidade como "128gb" e cor como "spacegray")
    let namespaceId = parts.slice(0, -2).join('-');

    // Se a penúltima parte não parece capacidade (não tem 'gb', 'mm', 'tb'),
    // então remove apenas a última parte (cor)
    const capacityPart = parts[parts.length - 2];

    if (!capacityPart.match(/\d+(gb|mm|tb)/i)) {
      namespaceId = parts.slice(0, -1).join('-');
    }

    // Extrai cor do prodId (última parte)
    const color = parts[parts.length - 1];

    // Busca todos os produtos da mesma família
    const relatedProducts = response.data.filter(item =>
      item.id.startsWith(namespaceId),
    );

    // Extrai capacidades disponíveis (ordenadas)
    const capacityAvailable = Array.from(
      new Set(relatedProducts.map(item => item.capacity)),
    ).sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);

      return numA - numB;
    });

    // Extrai cores disponíveis
    const colorsAvailable = Array.from(
      new Set(
        relatedProducts.map(item => {
          const itemParts = item.id.split('-');

          return itemParts[itemParts.length - 1];
        }),
      ),
    );

    // Cria uma descrição genérica baseada no tipo de produto
    const description = [
      {
        title: 'About this product',
        text: [
          `The ${product.name} combines cutting-edge technology with elegant design.`,
          `Features a stunning ${product.screen} display for immersive viewing experience.`,
          `Equipped with ${product.ram} of RAM for smooth multitasking performance.`,
        ],
      },
    ];

    // Converte ProductApiResponse para ProductDetailsApiResponse
    return {
      id: product.id,
      namespaceId: namespaceId,
      name: product.name,
      images: product.images,
      description: description,
      screen: product.screen,
      resolution: '',
      processor: '',
      ram: product.ram,
      camera: '',
      zoom: '',
      cell: [],
      colorsAvailable: colorsAvailable,
      capacityAvailable: capacityAvailable,
      color: color,
      capacity: product.capacity,
      category: product.category,
      priceRegular: product.priceRegular,
      priceDiscount: product.priceDiscount,
    };
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

export async function getSuggestedProducts(
  currentProductId: string,
  category: string,
  limit: number = 4,
): Promise<Product[]> {
  try {
    const response = await api.get<ProductApiResponse[]>(
      `/api/${category}.json`,
    );

    // Filtra produtos diferentes do atual e pega os primeiros N
    const suggested = response.data
      .filter(item => item.id !== currentProductId)
      .slice(0, limit)
      .map(item => ({
        id: item.id,
        name: item.name,
        categoryId: item.category || category,
        fullPrice: item.priceRegular,
        price: item.priceDiscount,
        images: item.images,
        screen: item.screen,
        capacity: item.capacity,
        ram: item.ram,
      }));

    return suggested;
  } catch (error) {
    return [];
  }
}
