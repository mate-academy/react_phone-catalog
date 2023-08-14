import { useEffect, useState } from 'react';

import { getPhones } from '../../functions/getPhones';

import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';

import { Phone } from '../../types/Phone';

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
    <div className="phones page__phones">
      {!isLoading ? (
        <>
          <h1 className="phones__title">
            Mobile phones
          </h1>

          <p className="phones__count">
            {`${phones?.length} models`}
          </p>

          <ProductsList products={phones} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
