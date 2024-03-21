import React, { memo } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProductsCatalog } from '../components/ProductsCatalog';

import useProducts from '../hooks/UseProducts';

import { FetchFuction } from '../types/FetchFunction';

type Props = {
  fetchFunction: FetchFuction;
  pageTitle: string;
};

export const ProductPage: React.FC<Props> = memo(
  ({ fetchFunction, pageTitle }) => {
    const { fetchedProducts, loading, error, isFetched } =
      useProducts(fetchFunction);

    const isError = error && !loading;
    const isProductsNotFound =
      !loading && !error && isFetched && !fetchedProducts.length;
    const isProductsFound =
      !loading && !error && isFetched && !!fetchedProducts.length;

    return (
      <section className="Main__productPage">
        <div className="Main__breadcrumbs">
          <Breadcrumbs />
        </div>
        <h1>{pageTitle}</h1>
        <div className="Main__productCatalog">
          {loading && <Loader />}
          {isError && (
            <ErrorMessage
              message={`Failed to fetch ${pageTitle.toLowerCase()}`}
            />
          )}
          {isProductsNotFound && (
            <div className="Main__noItemsBlock">
              <h1>{`Sorry, but no ${pageTitle} found`}</h1>
              <p className="Main__text">
                Try find products in another category
              </p>
            </div>
          )}
          {isProductsFound && <ProductsCatalog products={fetchedProducts} />}
        </div>
      </section>
    );
  },
);
