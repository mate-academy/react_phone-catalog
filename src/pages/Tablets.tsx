import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Error } from '../components/Error/Error';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults/NoResults';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { getProducts } from '../helpers/api';
import { Product } from '../types/Product';

export const Tablets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [tablets, setTablets] = useState<Product[]>([]);
  const noError = !loadingError && !isLoading;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  async function getTablets() {
    try {
      setLoadingError(false);
      const response = await getProducts();

      setTablets(response.filter(product => product.type === 'tablet'));
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const abortController = new AbortController();

    getTablets();

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
          <h1 className="page__sectionTitle page__title">Tablets</h1>
          <p className="page__count">{`${tablets.length} models`}</p>
        </>
      )}

      {noError && tablets.length > 0 && (
        <ProductsList products={tablets} />
      )}

      {noError && tablets.length === 0 && (
        <NoResults />
      )}
    </>
  );
};
