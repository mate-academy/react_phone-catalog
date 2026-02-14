import { Product } from '../types/Product';

export const getRandomProducts = (
  products: Product[],
  currentProductId?: string,
  count: number = 4,
): Product[] => {
  // Фильтруем товары, исключая текущий
  const filteredProducts = products.filter(
    product => product.itemId !== currentProductId,
  );

  // Перемешиваем массив случайным образом (Fisher-Yates shuffle)
  for (let i = filteredProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [filteredProducts[i], filteredProducts[j]] = [
      filteredProducts[j],
      filteredProducts[i],
    ];
  }

  // Возвращаем нужное количество товаров
  return filteredProducts.slice(0, count);
};
