import { useParams } from 'react-router-dom';
import { ProductPage } from '../ProductPage/ProductPage';

export const ProductPageWrapper = () => {
  const { category } = useParams();

  return <ProductPage key={category} />;
};
