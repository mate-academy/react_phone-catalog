import { useNavigate } from 'react-router-dom';
import { PagesType } from '../types/PagesType';
import { Product } from '../types/ProductType';

export const useNavigateToProduct = () => {
  const navigate = useNavigate();

  const goToProduct = (product: Product) => {
    const page = PagesType[product.category as keyof typeof PagesType];

    navigate(`${page}/${product.itemId}`);
  };

  return goToProduct;
};
