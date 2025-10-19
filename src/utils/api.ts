import { Product } from '../types';

const API_BASE =
  process.env.NODE_ENV === 'production' ? '/react_phone-catalog/api' : 'api';

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE}/products.json`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      return data || [];
    } catch (error) {
      //console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProductDetails(productId: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE}/products.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const products: Product[] = await response.json();

      const foundProduct = products.find(
        p =>
          p.id === productId ||
          p.itemId === productId ||
          p.id?.toString() === productId ||
          p.itemId?.toString() === productId,
      );

      return foundProduct || null;
    } catch (error) {
      return null;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.getProducts();

      return products.filter(product => product.category === category);
    } catch (error) {
      //console.error('Error fetching products by category:', error);
      return [];
    }
  },

  async getSuggestedProducts(
    currentProductId: string,
    limit: number = 8,
  ): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      const filteredProducts = products
        .filter(product => product.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);

      return filteredProducts;
    } catch (error) {
      //console.error('Error fetching suggested products:', error);
      return [];
    }
  },
};
