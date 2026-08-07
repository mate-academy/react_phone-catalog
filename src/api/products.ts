import { Product } from 'src/types/Product';
import { get } from './httpClient';
import { ProductDetails } from 'src/types/ProductDetails';
import { Category } from '@shared/constants/categoryConfig';

export const getProducts = (): Promise<Product[]> => get('/products.json');

const CATEGORY_FILES = {
  phones: '/phones.json',
  tablets: '/tablets.json',
  accessories: '/accessories.json',
};

export const getCategoryDetails = (
  category: Category,
): Promise<ProductDetails[]> => get<ProductDetails[]>(CATEGORY_FILES[category]);
