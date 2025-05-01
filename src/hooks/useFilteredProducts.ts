import { useSelector } from 'react-redux';
import { Category } from '../types/category';
import { RootState } from '../app/store';

export const useFilteredProducts = (category: Category) => {
  const productsList = useSelector((state: RootState) => state.products.items);

  const products = productsList.filter(
    product => product.category === category,
  );

  const status = useSelector((state: RootState) => state.products.status);

  return {
    products,
    status,
  };
};
