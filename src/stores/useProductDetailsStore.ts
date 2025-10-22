import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  AnyDetailedProduct,
  PhoneDetails,
  TabletDetails,
  AccessoryDetails,
} from '../types/DetailedProductTypes';

// Інтерфейс для кешованих категорійних даних
interface CachedCategoryData {
  phones: PhoneDetails[] | null;
  tablets: TabletDetails[] | null;
  accessories: AccessoryDetails[] | null;
}

interface ProductDetailsState {
  product: AnyDetailedProduct | null;
  isLoading: boolean;
  error: string | null;
  // Ці поля будуть зберігатися та відновлюватися з localStorage
  cachedCategoryData: CachedCategoryData; // Об'єднуємо кеш у один об'єкт
  fetchProductDetails: (category: string, itemId: string) => Promise<void>;
  clearProductDetails: () => void;
}

// Переміщаємо створення стору всередину persist
const useProductDetailsStore = create<ProductDetailsState>()(
  persist(
    (set, get) => ({
      product: null,
      isLoading: false,
      error: null,
      cachedCategoryData: {
        // Початковий стан кешу в локалстореджі
        phones: null,
        tablets: null,
        accessories: null,
      },

      fetchProductDetails: async (category, itemId) => {
        set({ isLoading: true, error: null, product: null });

        try {
          let allDetailedItems: AnyDetailedProduct[] | null = null;
          const { cachedCategoryData } = get(); // Отримуємо весь об'єкт кешу

          // 1. Спроба взяти дані з localStorage (через persist)
          if (category === 'phones' && cachedCategoryData.phones) {
            allDetailedItems = cachedCategoryData.phones;
            console.log('Телефони взяті з localStorage/кешу стору!');
          } else if (category === 'tablets' && cachedCategoryData.tablets) {
            allDetailedItems = cachedCategoryData.tablets;
            console.log('Планшети взяті з localStorage/кешу стору!');
          } else if (
            category === 'accessories' &&
            cachedCategoryData.accessories
          ) {
            allDetailedItems = cachedCategoryData.accessories;
            console.log('Аксесуари взяті з localStorage/кешу стору!');
          }

          // 2. Якщо в localStorage/кеші стору немає - завантажуємо
          if (!allDetailedItems) {
            const categoryFilePath = `/api/${category}.json`;
            console.log(`Завантажую ${categoryFilePath}...`);

            const response = await fetch(categoryFilePath);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            allDetailedItems = await response.json();

            // 3. Зберігаємо завантажені дані в кеш стору, і persist автоматично збереже в localStorage
            set(state => ({
              cachedCategoryData: {
                ...state.cachedCategoryData,
                [category]: allDetailedItems, // Динамічне оновлення властивості
              },
            }));
          }

          // 4. Знаходимо потрібний товар
          const foundProduct = allDetailedItems?.find(
            item => item.id === itemId,
          );

          if (!foundProduct) {
            throw new Error(
              `Product with itemId "${itemId}" not found in ${category} category.`,
            );
          }

          set({ product: foundProduct, isLoading: false });
        } catch (error: any) {
          console.error(
            `Помилка завантаження деталей для ${category}/${itemId}:`,
            error,
          );
          set({ error: error.message, isLoading: false });
        }
      },

      clearProductDetails: () => set({ product: null, error: null }),
    }),
    {
      name: 'product-details-cache', // Унікальне ім'я для кешу деталей
      storage: createJSONStorage(() => localStorage),
      // Не додаємо 'product', 'isLoading', 'error' в список полів для збереження,
      // або використовуємо partialize, щоб зберігати тільки cachedCategoryData
      partialize: state => ({ cachedCategoryData: state.cachedCategoryData }),
    },
  ),
);

export default useProductDetailsStore;
