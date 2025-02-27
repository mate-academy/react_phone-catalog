import { Product } from '../types/Product';
import { ProductDetailed } from '../types/ProductDetailed';
import { getData } from '../utils/httpClient';

export const getVisibleProducts = (
  products: Product[],
  currentPage: number,
  productsPerPage: number,
) => {
  const start = currentPage * productsPerPage;
  const end = start + productsPerPage;

  return products.slice(start, end);
};

export const getProductsByCategory = async (category: string) => {
  return getData<Product[]>('api/products').then(products =>
    products.filter(product => product.category === category),
  );
};

export const getProductById = async (category: string, productId: string) => {
  return getData<ProductDetailed[]>(`api/${category}`).then(
    products => products.find(product => product.id === productId) || null,
  );
};

export const getSuggestedProducts = async (categoryName: string) => {
  return getProductsByCategory(categoryName).then(
    filteredProductsByCategory => {
      if (filteredProductsByCategory.length <= 10) {
        return filteredProductsByCategory;
      }

      const randomIndex = Math.floor(
        Math.random() * (filteredProductsByCategory.length - 10),
      );

      const suggestedProducts = filteredProductsByCategory.slice(
        randomIndex,
        randomIndex + 10,
      );

      return suggestedProducts;
    },
  );
};
