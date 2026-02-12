import { useParams } from 'react-router-dom';
import { ProductCategory } from '../types/ProductCategory';

export const validCategories = ['phones', 'tablets', 'accessories'];

export type CatalogCategory = (typeof validCategories)[number];

export const useCatalogCategory = () => {
  const { category } = useParams<{ category: ProductCategory }>();

  const isValid = validCategories.includes(category as CatalogCategory);

  return isValid ? (category as ProductCategory) : null;
};
