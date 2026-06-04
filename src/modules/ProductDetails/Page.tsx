import { useParams } from 'react-router-dom';

import { useProductDetails } from '../../hooks/useProductDetails';

import { ProductDetailsContent } from './components/ProductDetailsContent';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { details, loading, error } = useProductDetails(productId);

  if (loading && !productId) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return <ProductDetailsContent details={details} />;
};
