import { Suspense } from 'react';
import {
  Await,
  defer,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Error as ErrorElement } from '../../components/Error/Error';
import { Loader } from '../../components/Loader/Loader';
import { MobilePhones } from '../../components/MobilePhones/MobilePhones';

import { BASE_URL } from '../../helpers/constants';
import { Product } from '../../types/Product';
import './PhonesPage.scss';

type PhonesPageData = {
  products: Product[];
};

export const PhonesPage: React.FC = () => {
  const { products } = useLoaderData() as PhonesPageData;

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  return (
    <div className="phones-page">
      {searchQuery === '' && (
        <div
          className="phones-page__section"
        >
          <Breadcrumbs />
        </div>
      )}

      <div className="phones-page__main-content">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={products}
            errorElement={<ErrorElement />}
          >
            {(loadedProducts) => <MobilePhones phones={loadedProducts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

async function loadPhones() {
  const response = await fetch(`${BASE_URL}${'products.json'}`);

  if (!response.ok) {
    throw new Error('Could not fetch phones.');
  }

  const resData = await response.json();

  return resData as Product[];
}

export function loader() {
  return defer({
    products: loadPhones(),
  });
}
