import { useEffect, useState } from 'react';

import { getProducts } from '../../functions/getProducts';

import { ApiProduct } from '../../types/ApiProduct';
import { Content } from '../../components/Content';

const title = 'Tablets';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<ApiProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((products: ApiProduct[]) => {
        setTablets(products.filter(
          product => product.type === 'tablet',
        ));
      })
      .catch(() => {
        throw new Error('Loading phones error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Content
      products={tablets}
      isLoading={isLoading}
      title={title}
    />
  );
};
