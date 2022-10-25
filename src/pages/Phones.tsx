import { useState, useEffect } from 'react';
import { Error } from '../components/Error/Error';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { UrlNavigation } from '../components/UrlNavigation/UrlNavigation';
import { getProducts } from '../helpers/api';
import { Product } from '../types/Product';

export const Phones = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [phones, setPhones] = useState<Product[]>([]);
  const noError = !loadingError && !isLoading;

  async function loadProducts() {
    setIsLoading(true);
    try {
      setLoadingError(false);
      const response = await getProducts();

      setPhones(response.filter(phone => phone.type === 'phone'));
    } catch (e) {
      setLoadingError(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const abortController = new AbortController();

    loadProducts();

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
      {noError && (
        <>
          <UrlNavigation />
          <h1 className="page__sectionTitle page__title">Mobile phones</h1>
          <p className="page__count">{`${phones.length} models`}</p>
          <ProductsList phones={phones} />
        </>
      )}
    </>
  );
};
