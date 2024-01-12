import React, { useEffect, useState } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { Loader } from '../../components/Loader/Loader';
import { NotFound } from '../../components/NotFound/NotFound';
import './AccessoriesPages.scss';
import { Product } from '../../types/Products';
import { getAccessories } from '../../api/fetchData';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const AccessoriesPages: React.FC = () => {
  const [accessoriesProduct, setTabletProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAccessories()
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
        <div className="accessories__title">Tablets</div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="accessories__container">
            {isError ? (
              <ErrorMessage />
            ) : (
              <div className="accessories__list">
                {accessoriesProduct.length ? (
                  accessoriesProduct.map(product => (
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
