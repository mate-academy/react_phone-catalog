import { IProductCard } from "../interfaces/ProductCard.interface";
import { IProductDetails } from "../interfaces/ProductDetails.interface";

export const ProductService = {
  async getAll() {
    try {
      const response = await fetch('/api/products.json');
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  async getByCategory(category: string) {
    try {
      const products: IProductCard[] = await this.getAll();
      return products.filter(product => product.category === category);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  async getByProductIdDetails(productId: string, category: string) {
    try {
      const response = await fetch(`/api/${category}.json`);
      const products: IProductDetails[] = await response.json();
      return products.find(product => product.id === productId);
    } catch (error) {
      console.error('Product not found', error);
    }
  },

  async getByProductId(productId: string) {
    try {
      const response = await fetch(`/api/products.json`);
      const products: IProductCard[] = await response.json();
      return products.find(product => product.itemId === productId);
    } catch (error) {
      console.error('Product not found', error);
    }
  },
}