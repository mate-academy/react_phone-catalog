import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Error } from '../components/Error/Error';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults/NoResults';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { getProducts } from '../helpers/api';
import { Product } from '../types/Product';

export const Accessories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const noError = !loadingError && !isLoading;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  async function getAccessories() {
    try {
      setLoadingError(false);
      const response = await getProducts();

      setAccessories(response.filter(product => product.type === 'accessory'));
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const abortController = new AbortController();

    getAccessories();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="page__notification">
          <Loader />
        </div>
      )}

      {!isLoading && loadingError && (
        <div className="page__notification">
          <Error />
        </div>
      )}

      {noError && !query && (
        <>
          <Breadcrumbs />
          <h1 className="page__sectionTitle page__title">Accessories</h1>
          <p className="page__count">{`${accessories.length} models`}</p>
        </>
      )}

      {noError && accessories.length > 0 && (
        <ProductsList products={accessories} />
      )}

      {noError && accessories.length === 0 && (
        <NoResults />
      )}
    </>
  );
};
