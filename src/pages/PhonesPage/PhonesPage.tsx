import { useEffect, useState } from 'react';

import { getPhones } from '../../functions/getPhones';

import { Phone } from '../../types/Phone';
import { Content } from '../../components/Content';

const title = 'Mobile phones';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then((products: Phone[]) => {
        setPhones(products.filter(
          product => product.category === 'phones',
        ));
      })
      .catch(() => {
        throw new Error('Loading phones error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Content
      products={phones}
      isLoading={isLoading}
      title={title}
    />
  );
};
