import { Category } from '@shared/constants/categoryConfig';
import { useParams } from 'react-router-dom';

export const useProductParams = () => {
  const params = useParams<{
    category: Category;
    productId: string;
  }>();

  if (!params.category || !params.productId) {
    throw new Error('Invalid route');
  }

  return {
    category: params.category,
    productId: params.productId,
  };
};
