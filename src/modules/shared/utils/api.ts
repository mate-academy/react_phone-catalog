import { Products, CatalogProduct } from '../types/Products';
const PhoneUrl = `${import.meta.env.BASE_URL}/api/phones.json `;
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

  await wait(1500);
  const phone: Products[] = await response.json();

  return phone;
}

export async function getTabletsFromApi() {
  const newUrl = TabletsUrl;

  const response = await fetch(newUrl);

  if (!response.ok) {
    throw new Error('Error upload phones from api');
  }

  await wait(1500);
  const tablets: Products[] = await response.json();

  return tablets;
}

export async function getAccessoriesUrlFromApi() {
  const newUrl = AccessoriesUrl;

  const response = await fetch(newUrl);

  if (!response.ok) {
    throw new Error('Error upload phones from api');
  }

  await wait(1500);
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
    getAccessoriesUrlFromApi(),
  ]);

  return [...phones, ...tablets, ...accessories];
}
