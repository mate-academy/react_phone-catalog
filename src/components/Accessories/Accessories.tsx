import { useEffect, useState } from 'react';
import { getPhones } from '../../utils/fetch';
import { Loader } from '../Loader';
import { ProductPhone } from '../../Type/phone';
import { HomeIcon } from '../HomeIcon/HomeIcon';

export const Accessories = () => {
  const [accessories, setAccessories] = useState<ProductPhone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPhones()
      .then(setAccessories)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const accessories2 = [...accessories]
    .filter(phone => phone.name === 'accessories');

  return (
    <section>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && accessories2.length === 0 && (
        <div className="tablets__container">
          <HomeIcon title="Accessories" />
          <h2>Accessories</h2>
          <p>Accessories are not available yet </p>
        </div>

      )}

      {accessories2.length !== 0 && (
        <h2>Tablets</h2>
      )}
      {!isLoading && isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </section>
  );
};

export default Accessories;
