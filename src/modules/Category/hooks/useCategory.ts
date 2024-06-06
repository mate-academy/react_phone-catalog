import { useLocation } from 'react-router-dom';
import { Category } from '../../../types';

export const useCategory = () => {
  const { pathname } = useLocation();

  const categoryName = pathname.replaceAll('/', '').toLowerCase() as Category;

  return categoryName;
};
