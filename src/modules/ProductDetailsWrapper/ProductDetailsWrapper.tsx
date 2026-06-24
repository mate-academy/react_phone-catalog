import { useParams } from 'react-router-dom';
import { ProductDetails } from '../ProductDetails/ProductDetails';

export const ProductDetailsWrapper = () => {
  const { productId } = useParams();

  return <ProductDetails key={productId} />;
};
