import { Product, ProductCategory } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getPublicPath } from '../utils/getPublicPath';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(getPublicPath('api/products.json'));

  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
};

export const getCategoryProducts = async (
  category: ProductCategory,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getSuggestedProducts = async (
  excludedProductId?: string,
): Promise<Product[]> => {
  const products = await getProducts();
  const suggestedProducts = products.filter(
    product => product.itemId !== excludedProductId,
  );

  for (let index = suggestedProducts.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [suggestedProducts[index], suggestedProducts[randomIndex]] = [
      suggestedProducts[randomIndex],
      suggestedProducts[index],
    ];
  }

  return suggestedProducts;
};

export interface ProductDetailsResult {
  product: ProductDetails;
  summary: Product;
  variants: ProductDetails[];
}

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetailsResult | null> => {
  const products = await getProducts();
  const summary = products.find(product => product.itemId === productId);

  if (!summary) {
    return null;
  }

  const response = await fetch(getPublicPath(`api/${summary.category}.json`));

  if (!response.ok) {
    throw new Error('Network error');
  }

  const categoryProducts: ProductDetails[] = await response.json();
  const product = categoryProducts.find(item => item.id === productId);

  if (!product) {
    return null;
  }

  return {
    product,
    summary,
    variants: categoryProducts.filter(
      item => item.namespaceId === product.namespaceId,
    ),
  };
};
