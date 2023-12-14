import { useEffect, useState } from 'react';
import { getPhones } from '../../utils/fetch';
import { Loader } from '../Loader';
import { ProductPhone } from '../../Type/phone';
import { HomeIcon } from '../HomeIcon/HomeIcon';
import './Tablets.scss';

export const Tablets = () => {
  const [tablets, setTablets] = useState<ProductPhone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPhones()
      .then(setTablets)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const tablets2 = [...tablets]
    .filter(phone => phone.name === 'tablet');

  return (
    <main>
      <section>
        <div className="container">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && tablets2.length === 0 && (
            <div className="tablets__container">
              <HomeIcon title="Tablets" />
              <h2>Tablets</h2>
              <p>Tablets are not available yet </p>
            </div>

          )}

          {tablets2.length !== 0 && (
            <h2>Tablets</h2>
          )}
          {!isLoading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Tablets;
