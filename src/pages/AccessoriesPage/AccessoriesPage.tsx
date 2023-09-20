import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { fetchAccessories } from '../../api';

import './AccessoriesPage.scss';
import { NoSearchResults } from '../../components/NoSearchResults';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    fetchAccessories()
      .then(setAccessories)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="AccessoriesPage">
      <div className="container container--with-min-height ">
        <div className="AccessoriesPage__content">
          <div className="AccessoriesPage__section">
            <Breadcrumbs />
          </div>

          <div className="AccessoriesPage__section">
            <h1 className="AccessoriesPage__title">Accessories</h1>
            <p className="AccessoriesPage__amount">
              {`${accessories.length} model${accessories.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isError ? (
            <h2 className="AccessoriesPage__error-title">
              Something went wrong
            </h2>
          ) : (
            <div className="AccessoriesPage__section">
              {isLoading && <Loader />}

              {!isLoading && (accessories.length === 0 ? (
                <NoSearchResults categoryName="Accessories" />
              ) : (
                <ProductsList
                  products={accessories}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
