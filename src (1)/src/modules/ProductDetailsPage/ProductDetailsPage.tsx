import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../api/products';
import { Loader } from '../shared/components/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    getProductDetails(productId)
      .then(setProduct)
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};
