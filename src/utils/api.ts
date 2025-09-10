import { Product, ProductDetails } from '../types';

const API_BASE =
  process.env.NODE_ENV === 'production' ? '/react_phone-catalog/api' : '/api';

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
      // console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProductDetails(productId: string): Promise<ProductDetails | null> {
    try {
      const response = await fetch(`${API_BASE}/product-details.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const products: ProductDetails[] = await response.json();

      return products.find(p => p.id === productId) || null;
    } catch (error) {
      // console.error('Error fetching product details:', error);
      return null;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.getProducts();

      return products.filter(product => product.category === category);
    } catch (error) {
      // console.error('Error fetching products by category:', error);
      return [];
    }
  },
};
