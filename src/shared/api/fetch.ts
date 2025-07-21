import { BaseProduct, Category } from '@shared/types/APITypes';

export const fetchCategory = async (category: Category) => {
  try {
    const response = await fetch(`/api/${category}.json`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load data');

    throw error;
  }
};

export const fetchBaseProducts = async (category?: Category) => {
  try {
    const response = await fetch('api/products.json');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return category
      ? data.filter((el: BaseProduct) => el.category === category)
      : data;
  } catch (error) {
    throw new Error('Unable to fetch base products');
  }
};
