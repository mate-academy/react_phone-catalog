import { useEffect, useState } from 'react';

import { getPhones } from '../../functions/getPhones';

import { Phone } from '../../types/Phone';
import { Content } from '../../components/Content';

const title = 'Tablets';

const page = 'tablets';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Phone[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then((products: Phone[]) => {
        setTablets(products.filter(
          product => product.category === 'tablet',
        ));
      })
      .catch(() => {
        throw new Error('Loading phones error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Content
      page={page}
      products={tablets}
      isLoading={isLoading}
      title={title}
    />
  );
};
