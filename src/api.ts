import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL + url}.json`;

  return wait(100)
    .then(() => fetch(fullURL))
    .then((res) => res.json());
}

export const getProducts = () => get<Product[]>('/products');

export const getHotPriceProducts = async () => {
  const products = await getProducts();

  return products
    .filter((product) => product.discount)
    .sort(
      (productA, productB) => (
        productB.discount * productB.price - productA.discount * productA.price
      ),
    );
};

export const getBrandNewProducts = async () => {
  const products = await getProducts();

  return products
    .filter((product) => !product.discount)
    .sort((productA, productB) => productB.price - productA.price);
};

export const getPhones = async () => {
  const products = await getProducts();

  return products.filter((product) => product.type === 'phone');
};

export const getTablets = async () => {
  const products = await getProducts();

  return products.filter((product) => product.type === 'tablet');
};

export const getAccessories = async () => {
  const products = await getProducts();

  return products.filter((product) => product.type === 'accessory');
};

export const getProductDetails = (productId: string) => get<ProductDetails>(`/products/${productId}`);

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  const suggestedProducts: Product[] = [];

  while (suggestedProducts.length < 8) {
    const suggestedProduct
      = products[Math.floor(Math.random() * products.length)];

    if (!suggestedProducts.includes(suggestedProduct)) {
      suggestedProducts.push(suggestedProduct);
    }
  }

  return suggestedProducts;
};

export const getProductById = async (productId: string) => {
  const products = await getProducts();

  return products.find((product) => productId === product.id);
};
