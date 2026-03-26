import { useMemo } from 'react';
import { Product } from '@/features/products/types/product';

type SortOption = 'newest' | 'priceAsc' | 'priceDesc' | string;

export const useProductFilters = (
  allProducts: Product[],
  categoryKey: string,
  sortBy: SortOption,
  currentPage: number,
  perPage: number
) => {
  // 1. Фільтруємо за категорією
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => product.category === categoryKey);
  }, [allProducts, categoryKey]);

  // 2. Сортуємо відфільтровані товари
  const sortedProducts = useMemo(() => {
    // Робимо копію масиву, оскільки метод sort мутує оригінал
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'priceAsc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        // Сортуємо за роком (від найновіших до найстаріших)
        return sorted.sort((a, b) => b.year - a.year);
    }
  }, [filteredProducts, sortBy]);

  // 3. Обрізаємо масив для поточної сторінки (Пагінація)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, perPage]);

  // Повертаємо об'єкт з результатами
  return {
    filteredProducts,      // Потрібно для відображення загальної кількості товарів
    paginatedProducts,     // Товари, які підуть на рендер поточної сторінки
    totalCount: filteredProducts.length, // Загальна кількість для пагінатора
  };
};
