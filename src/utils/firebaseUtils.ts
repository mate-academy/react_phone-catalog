import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../config/firebase';
import type { Product } from '../types/product';
import type { DetailedProduct } from '../types/detailedProduct';

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = ref(database, 'products');
    const snapshot = await get(productsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).filter(
        (item) => item && typeof item === 'object',
      ) as Product[];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  try {
    const productsRef = ref(database, 'products');
    const categoryQuery = query(
      productsRef,
      orderByChild('category'),
      equalTo(category),
    );
    const snapshot = await get(categoryQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).filter(
        (item) => item && typeof item === 'object',
      ) as Product[];
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = ref(database, `products/${id}`);
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const fetchDetailedProduct = async (
  category: string,
  itemId: string,
) => {
  try {
    const categoryRef = ref(database, category);
    const itemQuery = query(
      categoryRef,
      orderByChild('itemId'),
      equalTo(itemId),
    );
    const snapshot = await get(itemQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const items = Object.values(data);
      return items[0] || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching detailed product ${itemId} from ${category}:`,
      error,
    );
    throw error;
  }
};

export const fetchFromCollection = async (
  collectionName: string,
): Promise<unknown[]> => {
  try {
    const collectionRef = ref(database, collectionName);
    const snapshot = await get(collectionRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).filter(
        (item) => item && typeof item === 'object',
      );
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching from collection ${collectionName}:`, error);
    throw error;
  }
};

export const fetchDetailedProductVariants = async (
  category: string,
  namespaceId: string,
): Promise<DetailedProduct[]> => {
  try {
    const categoryRef = ref(database, category);
    const variantsQuery = query(
      categoryRef,
      orderByChild('namespaceId'),
      equalTo(namespaceId),
    );
    const snapshot = await get(variantsQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).filter(
        (item) => item && typeof item === 'object',
      ) as DetailedProduct[];
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching product variants for ${namespaceId} in ${category}:`,
      error,
    );
    throw error;
  }
};
