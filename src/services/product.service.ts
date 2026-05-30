import { IProductCard } from "../interfaces/ProductCard.interface";
import { IProductDetails } from "../interfaces/ProductDetails.interface";
export const BASE_URL = 'https://olyavidzi.github.io/react_phone-catalog/';

export const ProductService = {
  async getAll() {
    try {
      const response = await fetch(`api/products.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Products not found: ' +
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  async getByCategory(category: string): Promise<IProductCard[]> {
    try {
      const products: IProductCard[] = await this.getAll();

      return products.filter(product => product.category === category);
    } catch (error) {
      throw new Error('Error fetching products by category: ' +
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  async getByProductIdDetails(productId: string, category: string) {
    try {
      const response = await fetch(`api/${category}.json`);
      const products: IProductDetails[] = await response.json();

      return products.find(product => product.id === productId);
    } catch (error) {
      throw new Error('Product not found: ' +
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  async getByProductId(productId: string) {
    try {
      const response = await fetch(`api/products.json`);
      const products: IProductCard[] = await response.json();

      return products.find(product => product.itemId === productId);
    } catch (error) {
      throw new Error('Product not found: ' +
        (error instanceof Error ? error.message : 'Unknown error'));
    }
  },
};
