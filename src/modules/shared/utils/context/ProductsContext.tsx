/* eslint-disable padding-line-between-statements */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ProductType, ProductDetailsType, CategoryType, SupportedLanguage } from '../types';
import { useTranslation } from 'react-i18next';

interface ProductsContextType {
  //? Сирі дані та прапорці стану
  products: ProductType[];
  productsDetails: ProductDetailsType[];
  categoryCount: Record<CategoryType, number>;
  isLoading: boolean;
  isError: boolean;

  //? Функція для отримання відфільтрованих базових товарів
  //? (для сторінок категорій Phones/Tablets)
  getProductsByCategory: (category: CategoryType) => ProductType[];

  //? Асинхронна функція для довантаження детальних файлів
  //? (phones.json / tablets.json / accessories.json)
  loadCategoryDetails: (category: CategoryType) => Promise<void>;

  //? Функція для миттєвого пошуку детального товару в глобальному стейті
  //? (для сторінки деталей конкретного товару)
  getProductDetailById: (productId: string) => ProductDetailsType | undefined;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = (
  { children }: { children: React.ReactNode }
) => {
  const { i18n } = useTranslation();

  //? Базова мова додатка, від якої залежить, з якої папки API тягнути дані
  const currentLang: SupportedLanguage = i18n.language.startsWith('uk')
    ? 'uk'
    : 'en';

  //* СТЕЙТ ВІТРИНИ: Те, що безпосередньо рендериться на екрані користувача
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsDetails, setProductsDetails] = useState<ProductDetailsType[]>([]);

  //* ТІНЬОВИЙ КЕШ: Словники для збереження завантажених даних по мовах. Зміни тут не викликають рендер.
  const productsCache = useRef<Record<string, ProductType[]>>({});
  const detailsCache = useRef<Record<string, ProductDetailsType[]>>({});
  const categoriesCache = useRef<Record<string, CategoryType[]>>({});

  //* ЗАПОБІЖНИК: Зберігає унікальні ключі поточних активних запитів, щоб уникнути дублювання
  const activeRequests = useRef<Set<string>>(new Set());

  //* РОЗУМНИЙ ЛОАДЕР: Лічильник процесів. Показує лоадер, якщо хоча б один запит ще виконується.
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const [isError, setIsError] = useState(false);

  //? ГОЛОВНИЙ ЕФЕКТ: Слідкує за зміною мови та завантажує базовий каталог
  useEffect(() => {
    // 1. Швидке повернення з кешу, якщо дані для обраної мови вже існують
    if (productsCache.current[currentLang]) {
      setProducts(productsCache.current[currentLang]);
      setProductsDetails(detailsCache.current[currentLang] || []);

      return;
    }

    // 2. Очищення стейту перед новим запитом
    setProducts([]);
    setProductsDetails([]);

    const getProducts = async () => {
      setLoadingCount(prev => prev + 1); // Сигналізуємо про початок завантаження
      setIsError(false);

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/api/${currentLang}/products.json`);

        if (!response.ok) {
          throw new Error('Помилка завантаження products.json');
        }

        const data = await response.json();

        //*! ШТУЧНЕ УПОВІЛЬНЕННЯ ЗАВАНТАЖЕННЯ ДАНИХ *//
        await new Promise(resolve => setTimeout(resolve, 2000));
        //*! МОЖНА ВИДАЛИТИ *//

        // 3. Зберігаємо свіжі дані в тіньовий кеш поточної мови
        productsCache.current[currentLang] = data;

        // Ініціалізуємо порожні масиви деталей, щоб уникнути помилок undefined у майбутньому
        if (!detailsCache.current[currentLang]) detailsCache.current[currentLang] = [];
        if (!categoriesCache.current[currentLang]) categoriesCache.current[currentLang] = [];

        // 4. Оновлюємо стейт вітрини, щоб користувач побачив товари
        setProducts(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoadingCount(prev => Math.max(0, prev - 1)); // Сигналізуємо про кінець завантаження
      }
    };

    getProducts();
  }, [currentLang]);

  //? ДИНАМІЧНИЙ ПІДРАХУНОК: Рахує кількість товарів у кожній категорії
  const categoryCount = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    products.forEach(product => {
      const category = product.category as CategoryType;

      if (category in counts) {
        counts[category] += 1;
      }
    });

    return counts;
  }, [products]);

  //? ФІЛЬТР КАТЕГОРІЙ: Повертає список товарів для конкретної категорії товарів (наприклад, всі Phones)
  function getProductsByCategory(category: CategoryType): ProductType[] {
    return [...products].filter(prod => prod.category === category);
  }

  //? ДОВАНТАЖЕННЯ ДЕТАЛЕЙ: Завантажує JSON-файли для конкретних категорій (phones.json, tablets.json)
  async function loadCategoryDetails(category: CategoryType): Promise<void> {
    const requestKey = `${currentLang}-${category}`; // Створюємо ідентифікатор поточного запиту

    // Перевіряємо, чи є дані в кеші, АБО чи не виконується такий самий запит прямо зараз
    const isCached = categoriesCache.current[currentLang]?.includes(category);
    const isFetchingRightNow = activeRequests.current.has(requestKey);

    if (isCached || isFetchingRightNow) return;

    // Блокуємо повторні виклики та активуємо лоадер
    activeRequests.current.add(requestKey);
    setLoadingCount(prev => prev + 1);
    setIsError(false);

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}/api/${currentLang}/${category}.json`);

      if (!response.ok) {
        throw new Error(`Помилка завантаження ${category}.json`);
      }

      const data = await response.json();

      //*! ШТУЧНЕ УПОВІЛЬНЕННЯ ЗАВАНТАЖЕННЯ ДАНИХ *//
      await new Promise(resolve => setTimeout(resolve, 2000));
      //*! МОЖНА ВИДАЛИТИ *//

      // Об'єднуємо існуючий кеш деталей з новими завантаженими даними
      const currentDetailsCache = detailsCache.current[currentLang] || [];
      detailsCache.current[currentLang] = [...currentDetailsCache, ...data];

      // Відмічаємо категорію як завантажену в кеші
      const currentCategoriesCache = categoriesCache.current[currentLang] || [];
      categoriesCache.current[currentLang] = [...currentCategoriesCache, category];

      // Оновлюємо стейт вітрини, об'єднуючи старі деталі з новими
      setProductsDetails(prev => [...prev, ...data]);
    } catch (error) {
      setIsError(true);
    } finally {
      activeRequests.current.delete(requestKey); // Знімаємо блокування запиту
      setLoadingCount(prev => Math.max(0, prev - 1)); // Вимикаємо лоадер
    }
  }

  //? ПОШУК ТОВАРУ: Знаходить конкретний товар за ID серед усіх завантажених деталей
  function getProductDetailById(
    productId: string,
  ): ProductDetailsType | undefined {
    return productsDetails.find(product => product.id === productId);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsDetails,
        categoryCount,
        isLoading,
        isError,
        getProductsByCategory,
        loadCategoryDetails,
        getProductDetailById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
