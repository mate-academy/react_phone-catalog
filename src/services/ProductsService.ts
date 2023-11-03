import { categories } from '../widgets/Categories/categories.data';
import { IProduct } from '../entities/ProductCard/product.interface';
import { ICategory } from '../entities/Category/category.interface';
import { $api } from '../app/api/api';

export class ProductsService {
  static async getProducts() {
    return $api<IProduct[]>('products.json');
  }

  static async getCategories(): Promise<ICategory[]> {
    const products = await this.getProducts();

    return categories.map(category => {
      const total = products.filter(product => {
        return product.category === category.name;
      }).length;

      return { ...category, total };
    });
  }
}
