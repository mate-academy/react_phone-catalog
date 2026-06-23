import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const request = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error loading ${url}`);
  }

  return response.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await request('./api/products.json');

  return products;
};

export const getAllDetailedProducts = async (): Promise<ProductDetails[]> => {
  const [phones, tablets, accessories] = await Promise.all([
    request('./api/phones.json'),
    request('./api/tablets.json'),
    request('./api/accessories.json'),
  ]);

  return [...phones, ...tablets, ...accessories];
};

export const getProductById = async (
  productId: string,
): Promise<ProductDetails | null> => {
  const products = await getAllDetailedProducts();

  return products.find(product => product.id === productId) || null;
};

export const getSuggestedProducts = async (
  currentProductId: string,
): Promise<ProductDetails[]> => {
  const products = await getAllDetailedProducts();

  return products
    .filter(product => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);
};

export const getHotPriceProducts = async (): Promise<ProductDetails[]> => {
  const products = await getAllDetailedProducts();

  return products
    .filter(product => product.priceDiscount < product.priceRegular)
    .sort((a, b) => {
      const discountA = a.priceRegular - a.priceDiscount;
      const discountB = b.priceRegular - b.priceDiscount;

      return discountB - discountA;
    })
    .slice(0, 10);
};

export const getNewModelsProducts = async (): Promise<ProductDetails[]> => {
  const products = await getProducts();

  return products
    .sort((a, b) => b.year - a.year)
    .slice(0, 10)
    .map(product => ({
      ...product,
      id: product.itemId,
      images: [product.image],
      priceRegular: product.fullPrice,
      priceDiscount: product.price,
    })) as unknown as ProductDetails[];
};
