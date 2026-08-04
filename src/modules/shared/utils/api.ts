import { Products, CatalogProduct } from '../types/Products';
const PhoneUrl = `${import.meta.env.BASE_URL}/api/phones.json`;
const TabletsUrl = `${import.meta.env.BASE_URL}/api/tablets.json`;
const AccessoriesUrl = `${import.meta.env.BASE_URL}/api/accessories.json`;
const ProductsUrl = `${import.meta.env.BASE_URL}/api/products.json`;

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export async function getPhonesFromApi() {
  const newUrl = PhoneUrl;

  const response = await fetch(newUrl);

  if (!response.ok) {
    throw new Error('Error upload phones from api');
  }

  await wait(3000);
  const phone: Products[] = await response.json();

  return phone;
}

export async function getTabletsFromApi() {
  const newUrl = TabletsUrl;

  const response = await fetch(newUrl);

  if (!response.ok) {
    throw new Error('Error upload phones from api');
  }

  await wait(3000);
  const tablets: Products[] = await response.json();

  return tablets;
}

export async function getAccessoriesFromApi() {
  const newUrl = AccessoriesUrl;

  const response = await fetch(newUrl);

  if (!response.ok) {
    throw new Error('Error upload phones from api');
  }

  await wait(3000);
  const accessories: Products[] = await response.json();

  return accessories;
}

export async function getProductsFromApi() {
  const response = await fetch(ProductsUrl);

  if (!response.ok) {
    throw new Error('Error upload data from server');
  }

  const products: CatalogProduct[] = await response.json();

  return products;
}

export async function getAllDetailedProducts(): Promise<Products[]> {
  const [phones, tablets, accessories] = await Promise.all([
    getPhonesFromApi(),
    getTabletsFromApi(),
    getAccessoriesFromApi(),
  ]);

  return [...phones, ...tablets, ...accessories];
}

const fetchersByCategory: Record<string, () => Promise<Products[]>> = {
  phones: getPhonesFromApi,
  tablets: getTabletsFromApi,
  accessories: getAccessoriesFromApi,
};

export async function getDetailedProductByCategory(
  category: string,
  id: string,
): Promise<Products> {
  const fetcher = fetchersByCategory[category];

  if (!fetcher) {
    return undefined;
  }

  const products = await fetcher();

  return products.find(product => product.id === id);
}
