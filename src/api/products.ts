import { CategoryName, Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const API_BASE = `${import.meta.env.BASE_URL}api`;

// raw shape of an entry in /api/products.json, before it's mapped
// to the internal Product type (id becomes the itemId slug so it
// matches route params and ProductDetails.id everywhere else)
type RawProductSummary = {
  id: number;
  category: CategoryName;
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

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function fetchJson<T>(fileName: string): Promise<T> {
  await wait(300); // small artificial delay so the Loader is visible

  const response = await fetch(`${API_BASE}/${fileName}`);

  if (!response.ok) {
    throw new Error(`Something went wrong while loading ${fileName}`);
  }

  return response.json();
}

function mapSummary(raw: RawProductSummary): Product {
  return {
    id: raw.itemId,
    numericId: raw.id,
    category: raw.category,
    name: raw.name,
    fullPrice: raw.fullPrice,
    price: raw.price,
    screen: raw.screen,
    capacity: raw.capacity,
    color: raw.color,
    ram: raw.ram,
    year: raw.year,
    image: raw.image,
  };
}

export async function getProducts(): Promise<Product[]> {
  const raw = await fetchJson<RawProductSummary[]>('products.json');

  return raw.map(mapSummary);
}

export async function getProductsByCategory(
  category: CategoryName,
): Promise<Product[]> {
  const products = await getProducts();

  return products.filter(product => product.category === category);
}

const CATEGORY_FILES: Record<CategoryName, string> = {
  phones: 'phones.json',
  tablets: 'tablets.json',
  accessories: 'accessories.json',
};

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  // the summary tells us which category file to look in
  const products = await getProducts();
  const summary = products.find(product => product.id === productId);

  if (!summary) {
    return null;
  }

  const details = await fetchJson<ProductDetails[]>(
    CATEGORY_FILES[summary.category],
  );

  return details.find(item => item.id === productId) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();

  return products.find(product => product.id === id) ?? null;
}

export async function getProductVariants(
  namespaceId: string,
  category: CategoryName,
): Promise<ProductDetails[]> {
  const details = await fetchJson<ProductDetails[]>(CATEGORY_FILES[category]);

  return details.filter(item => item.namespaceId === namespaceId);
}

export async function getSuggestedProducts(
  currentProduct: Product,
): Promise<Product[]> {
  const products = await getProducts();

  const otherProducts = products.filter(
    product => product.id !== currentProduct.id,
  );

  return [...otherProducts].sort(() => Math.random() - 0.5).slice(0, 8);
}
