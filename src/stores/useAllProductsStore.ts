import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product'; // Ваш інтерфейс Product

interface AllProductsState {
  allProducts: Product[] | null;
  phones: Product[] | null;
  tablets: Product[] | null;
  accessories: Product[] | null;
  isLoading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<void>;
  getShortProductById: (id: string) => Product | undefined;
}

const useAllProductsStore = create<AllProductsState>()(
  persist(
    (set, get) => ({
      allProducts: null,
      phones: null,
      tablets: null,
      accessories: null,
      isLoading: false,
      error: null,

      getShortProductById: (id: string): Product | undefined => {
        const { allProducts } = get();

        if (!allProducts) {
          // Якщо загальний список ще не завантажений/немає в кеші, повертаємо undefined
          return undefined;
        }

        // Шукаємо продукт у загальному списку за його ідентифікатором
        return allProducts.find(p => p.itemId === id);
      },

      fetchAllProducts: async () => {
        const { allProducts } = get();

        if (allProducts) {
          console.log(
            'Всі продукти вже завантажені та відфільтровані з кешу стору.',
          );

          return; // Дані вже завантажені та оброблені
        }

        set({ isLoading: true, error: null });

        try {
          const filePath = `/api/products.json`; // Шлях до вашого products.json

          console.log(`Завантажую загальний список продуктів: ${filePath}...`);
          const response = await fetch(filePath);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Product[] = await response.json();

          // Фільтруємо дані за категоріями один раз
          const phones = data.filter(p => p.category === 'phones');
          const tablets = data.filter(p => p.category === 'tablets');
          const accessories = data.filter(p => p.category === 'accessories');

          set({
            allProducts: data,
            phones: phones,
            tablets: tablets,
            accessories: accessories,
            isLoading: false,
          });
          console.log(
            'Загальний список продуктів успішно завантажено та відфільтровано.',
          );
        } catch (error: any) {
          console.error(
            'Помилка завантаження загального списку продуктів:',
            error,
          );
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'all-products-and-categories-cache', // Нове ім'я кешу, щоб уникнути конфліктів
      storage: createJSONStorage(() => sessionStorage),
      // Зберігаємо всі відфільтровані списки та загальний
      partialize: state => ({
        allProducts: state.allProducts,
        phones: state.phones,
        tablets: state.tablets,
        accessories: state.accessories,
      }),
    },
  ),
);

export default useAllProductsStore;
