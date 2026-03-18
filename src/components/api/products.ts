import { Product } from "../types/Product";

const BASE_URL = '../api/products.json';


export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Помилка завантаження списку');
  return response.json();
};


export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const files = ['./api/phones.json', './api/tablets.json', './api/accessories.json'];

    const responses = await Promise.all(files.map(file => fetch(file)));
    const dataArrays = await Promise.all(
      responses.map(res => (res.ok ? res.json() : []))
    );

    const allDetailedProducts = dataArrays.flat();
    
    const cleanProductId = productId.trim().toLowerCase();

    const foundProduct = allDetailedProducts.find((p: any) => {
      const cleanId = String(p.id).trim().toLowerCase();
      return cleanId === cleanProductId;
    });

    if (!foundProduct) {
      console.warn(`Product with ID "${productId}" was not found in the loaded files.`);
      console.log('Available IDs (first 3):', allDetailedProducts.slice(0, 3).map(p => p.id));
    }

    return foundProduct || null;
  } catch (error) {
    console.error("Помилка при пошуку деталей:", error);
    return null;
  }
};