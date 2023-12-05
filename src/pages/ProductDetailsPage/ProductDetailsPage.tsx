import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/productsApi';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader';
import { NotFoundPage } from '../NotFoundPage';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then(setProduct)
        .catch(() => {
          setIsLoadError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isLoadError) {
    return <p>Error: Unable to load data from server!</p>;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <h1>{product.name}</h1>
  );
};
