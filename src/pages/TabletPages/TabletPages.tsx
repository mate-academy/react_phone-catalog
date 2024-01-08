/* eslint-disable no-console */
import './TabletPages.scss';
import { useEffect, useState } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { getTablets } from '../../api/fetchData';
import { Product } from '../../types/Products';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { NotFound } from '../../components/NotFound/NotFound';

export const TabletPages: React.FC = () => {
  const [tabletProduct, setTabletProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTablets()
      .then(setTabletProduct)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  }, []);

  return (
    <section
      className="tablets"
      data-cy="categoryLinksContainer"
    >
      <div className="container">
        <BreadCrumbs />
        <div className="tablets__title">Tablets</div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="tablets__container">
            {isError ? (
              <ErrorMessage />
            ) : (
              <div className="tablets__list">
                {tabletProduct.length ? (
                  tabletProduct.map(product => (
                    <div className="products__item" key={product.id}>
                      {product.name}
                    </div>
                  ))
                ) : (
                  <NotFound />
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
