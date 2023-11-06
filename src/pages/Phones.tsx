import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Error } from '../components/Error/Error';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults/NoResults';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { getProducts } from '../helpers/api';
import { Product } from '../types/Product';

export const Phones = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [phones, setPhones] = useState<Product[]>([]);
  const noError = !loadingError && !isLoading;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  async function getPhones() {
    try {
      setLoadingError(false);
      const response = await getProducts();

      setPhones(response.filter(product => product.type === 'phone'));
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const abortController = new AbortController();

    getPhones();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {!isLoading && loadingError && (
        <div className="page__notification">
          <Error />
        </div>
      )}

      {isLoading && (
        <div className="page__notification">
          <Loader />
        </div>
      )}

      {noError && !query && (
        <>
          <Breadcrumbs />
          <h1 className="page__sectionTitle page__title">Mobile Phones</h1>
          <p className="page__count">{`${phones.length} models`}</p>
        </>
      )}

      {noError && phones.length > 0 && (
        <ProductsList products={phones} />
      )}

      {noError && phones.length === 0 && (
        <NoResults />
      )}
    </>
  );
};
