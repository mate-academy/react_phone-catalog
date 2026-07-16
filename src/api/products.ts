import { Product, ProductCategory } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const getApiUrl = (fileName: string) => {
  return `${import.meta.env.BASE_URL}api/${fileName}`;
};

const request = async <T>(fileName: string): Promise<T> => {
  const response = await fetch(getApiUrl(fileName));

  if (!response.ok) {
    throw new Error(`Could not load ${fileName}`);
  }

  return response.json();
};

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>('products.json');
};

export const getCategoryDetails = (
  category: ProductCategory,
): Promise<ProductDetails[]> => {
  return request<ProductDetails[]>(`${category}.json`);
};

export const getProductDetails = async (
  category: ProductCategory,
  productId: string,
): Promise<{
  product: ProductDetails | null;
  variants: ProductDetails[];
}> => {
  const categoryProducts = await getCategoryDetails(category);

  const product =
    categoryProducts.find(
      categoryProduct => categoryProduct.id === productId,
    ) || null;

  if (!product) {
    return {
      product: null,
      variants: [],
    };
  }

  const variants = categoryProducts.filter(
    categoryProduct => categoryProduct.namespaceId === product.namespaceId,
  );

  return {
    product,
    variants,
  };
};
