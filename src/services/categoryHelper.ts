import { getData } from '../utils/httpClient';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { capitalizeFirstLetter } from './stringHelper';

export const getCategoryTitle = (category: string) => {
  if (category === 'phones') {
    return 'Mobile phones';
  } else {
    return capitalizeFirstLetter(category);
  }
};

export const getCategories = async () => {
  const products = await getData<Product[]>('api/products');
  const categories = Array.from(
    new Set(products.map(product => product.category)),
  );
  const categoriesList: Category[] = categories.map(category => ({
    name: category,
    title: getCategoryTitle(category),
    image: `./img/category/${category}.png`,
    productsCount: products.filter(product => product.category === category)
      .length,
  }));

  return categoriesList;
};

export const getCategoryByName = async (categoryName: string) => {
  return getCategories().then(categories =>
    categories.find(categoryItem => categoryItem.name === categoryName),
  );
};
