import { useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { getProductById } from '@shared/services/api/api';
import { ProductModel } from '@shared/types/Product';

export const useProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductModel | null>(null);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getProductById(params.id)
        .then(response => {
          setProduct(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params.id]);

  const productFeatures = useMemo(() => {
    if (!product) {
      return null;
    }

    return [
      !!product.screen && {
        title: 'Screen',
        value: product.screen,
      },
      !!product.resolution && {
        title: 'Resolution',
        value: product.resolution,
      },
      !!product.capacity && {
        title: 'Capacity',
        value: product.capacity,
      },
      !!product.processor && {
        title: 'Processor',
        value: product.processor,
      },
      !!product.ram && {
        title: 'RAM',
        value: product.ram,
      },
    ].filter(item => typeof item === 'object');
  }, [product]);

  return {
    product,
    isLoading,
    features: productFeatures,
  };
};
