import { create } from 'zustand';
import { Product } from '../types/Product';

interface ProductState {
  allProducts: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductState>(set => ({
  allProducts: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('api/products.json'); // Завантажуємо всі продукти

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();

      set({ allProducts: data, isLoading: false }); // Зберігаємо весь масив
    } catch (error: any) {
      console.error('Помилка завантаження продуктів:', error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useProductStore;
