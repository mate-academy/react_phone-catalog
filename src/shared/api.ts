import type { Category, Product } from './types';

type RawListProduct = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

type DescriptionBlock = {
  title: string;
  text: string[];
};

type RawDetailedProduct = {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];

  description: DescriptionBlock[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

const API_BASE = import.meta.env.DEV ? '/api/' : '/react_phone-catalog/api/';

const getApiUrl = (file: string) => {
  return `${API_BASE}${file}`;
};

async function getJson<T>(file: string): Promise<T> {
  const response = await fetch(getApiUrl(file));

  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const getProductsData = () => {
  return getJson<RawListProduct[]>('products.json');
};

const getCategoryData = (category: Category) => {
  return getJson<RawDetailedProduct[]>(`${category}.json`);
};

const createDescription = (description: DescriptionBlock[]) => {
  return description
    .map(block => {
      return `${block.title}\n${block.text.join(' ')}`;
    })
    .join('\n\n');
};

const createBasicProduct = (product: RawListProduct): Product => {
  return {
    id: product.itemId,
    category: product.category,
    namespaceId: product.itemId,

    name: product.name,

    priceRegular: product.fullPrice,
    priceDiscount: product.price,

    year: product.year,

    capacity: product.capacity,
    capacityAvailable: [product.capacity],

    color: product.color,
    colorsAvailable: [product.color],

    images: [product.image],

    description: '',

    screen: product.screen,
    resolution: '',
    processor: '',
    ram: product.ram,
    camera: '',
    zoom: '',
    cell: [],
  };
};

const createDetailedProduct = (
  product: RawDetailedProduct,
  year: number,
): Product => {
  return {
    id: product.id,
    category: product.category,
    namespaceId: product.namespaceId,

    name: product.name,

    priceRegular: product.priceRegular,
    priceDiscount: product.priceDiscount,

    year,

    capacity: product.capacity,
    capacityAvailable: product.capacityAvailable,

    color: product.color,
    colorsAvailable: product.colorsAvailable,

    images: product.images,

    description: createDescription(product.description),

    screen: product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
    camera: product.camera,
    zoom: product.zoom,
    cell: product.cell,
  };
};

export async function getProducts(): Promise<Product[]> {
  const products = await getProductsData();

  return products.map(createBasicProduct);
}

export async function getProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const products = await getProductsData();

  return products
    .filter(product => product.category === category)
    .map(createBasicProduct);
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  const products = await getProductsData();

  const basicProduct = products.find(product => product.itemId === productId);

  if (!basicProduct) {
    return null;
  }

  const detailedProducts = await getCategoryData(basicProduct.category);

  const detailedProduct = detailedProducts.find(
    product => product.id === basicProduct.itemId,
  );

  if (!detailedProduct) {
    return null;
  }

  return createDetailedProduct(detailedProduct, basicProduct.year);
}

export async function getProductVariants(
  namespaceId: string,
  category: Category,
  year: number,
): Promise<Product[]> {
  const detailedProducts = await getCategoryData(category);

  return detailedProducts
    .filter(product => product.namespaceId === namespaceId)
    .map(product => createDetailedProduct(product, year));
}

export async function getSuggestedProducts(
  currentProductId: string,
): Promise<Product[]> {
  const products = await getProducts();

  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}
