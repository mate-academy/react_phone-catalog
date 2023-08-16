import { useEffect, useState } from 'react';

import { getPhones } from '../../functions/getPhones';

import { Phone } from '../../types/Phone';
import { Content } from '../../components/Content';

const title = 'Accessories';

const page = 'accessories';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Phone[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then((products: Phone[]) => {
        setAccessories(products.filter(
          product => product.category === 'accessories',
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
      products={accessories}
      isLoading={isLoading}
      title={title}
    />
  );
};
