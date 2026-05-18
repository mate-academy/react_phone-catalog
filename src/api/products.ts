// src/api/products.ts
import { client } from './fetchClient';
import { Product, ProductDetails } from '../types/Product';

// Отримати всі продукти (з products.json)
export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

// ДОДАНО: Отримати продукти за конкретною категорією
export const getProductsByCategory = (category: string) => {
  // category буде 'phones', 'tablets' або 'accessories'
  // Тому ми динамічно формуємо шлях: /phones.json
  return client.get<Product[]>(`/${category}.json`);
};

// Пізніше ми додамо сюди функції:
// - getProductsByCategory (читатиме phones.json, tablets.json)
// - getProductById (для сторінки деталей)
// - getSuggestedProducts (для рандомних товарів)

export const getProductDetails = async (productId: string) => {
  // Завантажуємо всі файли категорій паралельно
  const [phones, tablets, accessories] = await Promise.all([
    client.get<ProductDetails[]>('/phones.json').catch(() => []),
    client.get<ProductDetails[]>('/tablets.json').catch(() => []),
    client.get<ProductDetails[]>('/accessories.json').catch(() => []),
  ]);

  // Об'єднуємо їх в один великий масив
  const allProducts = [...phones, ...tablets, ...accessories];

  // Шукаємо товар за його ID
  const product = allProducts.find(
    p => p.id === productId || p.itemId === productId,
  );

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

// Функція для рекомендованих товарів (просто беремо всі і мішаємо)
export const getSuggestedProducts = async () => {
  const allProducts = await client.get<Product[]>('/products.json');

  return [...allProducts].sort(() => Math.random() - 0.5).slice(0, 8);
};

export const getHotProducts = async () => {
  const products = await client.get<Product[]>('/products.json');

  return products.sort((a, b) => {
    // Рахуємо суму знижки для кожного товару
    const discountA = (a.fullPrice || 0) - (a.price || 0);
    const discountB = (b.fullPrice || 0) - (b.price || 0);

    return discountB - discountA; // Від найбільшої знижки до найменшої
  });
};

export const getBrandNewProducts = async () => {
  const products = await client.get<Product[]>('/products.json');

  // Сортуємо за роком (або ціною, якщо рік однаковий)
  return products.sort((a, b) => (b.year || 0) - (a.year || 0));
};
