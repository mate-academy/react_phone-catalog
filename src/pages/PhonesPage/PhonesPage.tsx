import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { fetchPhones } from '../../api';

import './PhonesPage.scss';
import { NoSearchResults } from '../../components/NoSearchResults';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    fetchPhones()
      .then(setPhones)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="PhonesPage">
      <div className="container container--with-min-height ">
        <div className="PhonesPage__content">
          <div className="PhonesPage__section">
            <Breadcrumbs />
          </div>

          <div className="PhonesPage__section">
            <h1 className="PhonesPage__title">Mobile phones</h1>
            <p className="PhonesPage__amount">
              {`${phones.length} model${phones.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isError ? (
            <h2 className="PhonesPage__error-title">
              Something went wrong
            </h2>
          ) : (
            <div className="PhonesPage__section">
              {isLoading && <Loader />}

              {!isLoading && (phones.length === 0 ? (
                <NoSearchResults categoryName="Phones" />
              ) : (
                <ProductsList
                  products={phones}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
