import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Error as ErrorElement } from '../../components/Error/Error';
import { Loader } from '../../components/Loader/Loader';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { BASE_URL } from '../../helpers/constants';
import { Product } from '../../types/Product';
import './AccessoriesPage.scss';

type AccessoriesPageData = {
  products: Product[];
};

export const AccessoriesPage: React.FC = () => {
  const { products } = useLoaderData() as AccessoriesPageData;

  return (
    <div className="accessories-page">
      <div className="accessories-page__section">
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
              ) => product.category === 'accessory').length;

            return (
              <>
                <div className="accessories-page__section">
                  <h1 className="accessories-page__title">Accessories</h1>

                  <span
                    className="accessories-page__models-amount"
                  >
                    {`${productsAmount} model${productsAmount !== 1 ? 's' : ''}`}
                  </span>
                </div>

                <div
                  className="accessories-page__main-content"
                >
                  <div
                    className="accessories-page__products"
                  >
                    {!productsAmount && (
                      <NoProducts>
                        Accessories not found.
                      </NoProducts>
                    )}
                  </div>
                </div>
              </>
            );
          }}

        </Await>
      </Suspense>
    </div>
  );
};

async function loadAccessories() {
  const response = await fetch(`${BASE_URL}${'products.json'}`);

  if (!response.ok) {
    throw new Error('Could not fetch accessories.');
  }

  const resData = await response.json();

  return resData as Product[];
}

export function loader() {
  return defer({
    products: loadAccessories(),
  });
}
