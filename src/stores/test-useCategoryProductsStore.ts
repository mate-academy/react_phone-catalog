import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product'; // Базовий інтерфейс продукту

interface CategoryProductsState {
  products: { [category: string]: Product[] | null }; // Кеш продуктів за категорією
  isLoading: boolean;
  error: string | null;
  fetchCategoryProducts: (category: string) => Promise<void>;
}

const useCategoryProductsStore = create<CategoryProductsState>()(
  persist(
    (set, get) => ({
      products: {}, // Об'єкт для зберігання кешованих масивів продуктів за категоріями
      isLoading: false,
      error: null,

      fetchCategoryProducts: async category => {
        set({ isLoading: true, error: null });

        const cachedProducts = get().products[category];

        if (cachedProducts) {
          set({ isLoading: false }); // Вже завантажено, просто виходимо
          console.log(`Продукти категорії "${category}" взяті з кешу стору.`);

          return;
        }

        try {
          const filePath = `/api/${category}.json`; // Шлях до вашого JSON-файлу
          console.log(`Завантажую продукти для категорії: ${filePath}...`);
          const response = await fetch(filePath);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Product[] = await response.json(); // Очікуємо масив Product

          set(state => ({
            products: {
              ...state.products,
              [category]: data, // Кешуємо отримані дані
            },
            isLoading: false,
          }));
          console.log(`Продукти категорії "${category}" успішно завантажені.`);
        } catch (error: any) {
          console.error(
            `Помилка завантаження продуктів для категорії "${category}":`,
            error,
          );
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'category-products-cache', // Ім'я кешу для localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ products: state.products }), // Зберігаємо тільки 'products'
    },
  ),
);

export default useCategoryProductsStore;
