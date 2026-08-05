import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from './client';

const API_URL = './api';

export const getProducts = () => {
  return getData<Product[]>(`${API_URL}/products.json`);
};

export const getProductDetails = (category: Category) => {
  return getData<ProductDetails[]>(`${API_URL}/${category}.json`);
};

export const getProductById = async (productId: string) => {
  const products = await getProducts();

  const productFromCatalog = products.find(product => {
    return product.itemId === productId;
  });

  if (!productFromCatalog) {
    return null;
  }

  const categoryProducts = await getProductDetails(productFromCatalog.category);

  return categoryProducts.find(product => product.id === productId) || null;
};

const shuffleProducts = (products: Product[]) => {
  const shuffledProducts = [...products];

  for (
    let currentIndex = shuffledProducts.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    const currentProduct = shuffledProducts[currentIndex];

    shuffledProducts[currentIndex] = shuffledProducts[randomIndex];

    shuffledProducts[randomIndex] = currentProduct;
  }

  return shuffledProducts;
};

export const getSuggestedProducts = async (
  currentProductId: string,
  limit = 10,
) => {
  const products = await getProducts();

  const availableProducts = products.filter(product => {
    return product.itemId !== currentProductId;
  });

  return shuffleProducts(availableProducts).slice(0, limit);
};
