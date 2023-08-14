import { useEffect, useState } from 'react';

import { getProducts } from '../../functions/getProducts';

import { ApiProduct } from '../../types/ApiProduct';
import { Content } from '../../components/Content';

const title = 'Accessories';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<ApiProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((products: ApiProduct[]) => {
        setAccessories(products.filter(
          product => product.type === 'accessories',
        ));
      })
      .catch(() => {
        throw new Error('Loading phones error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Content
      products={accessories}
      isLoading={isLoading}
      title={title}
    />
  );
};
