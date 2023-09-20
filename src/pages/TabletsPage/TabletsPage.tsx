import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { fetchTablets } from '../../api';

import './TabletsPage.scss';
import { NoSearchResults } from '../../components/NoSearchResults';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    fetchTablets()
      .then(setTablets)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="TabletsPage">
      <div className="container container--with-min-height ">
        <div className="TabletsPage__content">
          <div className="TabletsPage__section">
            <Breadcrumbs />
          </div>

          <div className="TabletsPage__section">
            <h1 className="TabletsPage__title">Tablets</h1>
            <p className="TabletsPage__amount">
              {`${tablets.length} model${tablets.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isError ? (
            <h2 className="TabletsPage__error-title">
              Something went wrong
            </h2>
          ) : (
            <div className="TabletsPage__section">
              {isLoading && <Loader />}

              {!isLoading && (tablets.length === 0 ? (
                <NoSearchResults categoryName="Tablets" />
              ) : (
                <ProductsList
                  products={tablets}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
