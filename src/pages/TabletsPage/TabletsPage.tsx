import React, { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Error as ErrorElement } from '../../components/Error/Error';
import { Loader } from '../../components/Loader/Loader';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { BASE_URL } from '../../helpers/constants';
import { Product } from '../../types/Product';
import './TabletsPage.scss';

type TabletsPageData = {
  products: Product[];
};

export const TabletsPage: React.FC = () => {
  const { products } = useLoaderData() as TabletsPageData;

  return (
    <div className="tablets-page">
      <div className="tablets-page__section">
        <Breadcrumbs />
      </div>

      <Suspense fallback={<Loader />}>
        <Await
          resolve={products}
          errorElement={<ErrorElement />}
        >
          {(loadedProducts) => {
            const productsAmount = loadedProducts
              .filter((
                product: Product,
              ) => product.category === 'tablet').length;

            return (
              <>
                <div className="tablets-page__section">
                  <h1 className="tablets-page__title">Tablets</h1>

                  <span
                    className="tablets-page__models-amount"
                  >
                    {`${productsAmount} model${productsAmount !== 1 ? 's' : ''}`}
                  </span>
                </div>

                <div
                  className="tablets-page__main-content"
                >
                  {!productsAmount && (
                    <NoProducts>
                      Tablets not found.
                    </NoProducts>
                  )}
                </div>
              </>
            );
          }}

        </Await>
      </Suspense>
    </div>
  );
};

async function loadTablets() {
  const response = await fetch(`${BASE_URL}${'products.json'}`);

  if (!response.ok) {
    throw new Error('Could not fetch tablets.');
  }

  const resData = await response.json();

  return resData as Product[];
}

export function loader() {
  return defer({
    products: loadTablets(),
  });
}
