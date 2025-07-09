import { Category } from '@shared/types/APITypes';

export const fetchProducts = async (category: Category) => {
  try {
    const response = await fetch(`/api/${category}.json`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to load data');

    return null;
  }
};
