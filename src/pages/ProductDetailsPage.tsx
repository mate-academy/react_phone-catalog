import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPhonesList } from '../api';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { BackButton } from '../components/BackButton';
import { DetailsProductGallery } from '../components/DetailsProductGallery';
import { DetailsProductSelect } from '../components/DetailsProductSelect';
import { Error } from '../components/Error';

import { Phone } from '../types/Phone';
import { Details } from '../types/Details';
import { DetailsProductAbout } from '../components/DetailsProductAbout';
import { DetailsProductSpecs } from '../components/DetailsProductSpecs';
import { ProductsSlider } from '../components/ProductsSlider';
import { randomSequence } from '../utils/detailsUtils';

export const ProductDetailsPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [details, setDetails] = useState<Details | null>(null);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();

  const pathArray = location.pathname.slice(1).split('/');
  const productId = pathArray[1];
  const currentPhone = phones.find(phone => phone.id === productId);
  const productDetailsPath = currentPhone?.itemId;
  const productName = currentPhone?.name;
  const publicPath = process.env.PUBLIC_URL;
  const infoPath = `${publicPath}/_new/products/${productDetailsPath}.json`;
  const randomPhones = randomSequence(phones);

  const getDetails = async (path: string): Promise<Details> => {
    const response = await fetch(path);
    const detailsData = await response.json();

    return detailsData;
  };

  const fetchPhonesProcess = (api: Phone[]) => {
    setIsFetching(false);
    setIsError(false);
    setPhones(api);
  };

  const fetchDetailsProcess = (api: Details) => {
    setIsFetching(false);
    setIsError(false);
    setDetails(api);
  };

  const errorProcess = () => {
    setIsFetching(false);
    setIsError(true);
  };

  useEffect(() => {
    setIsFetching(true);
    getPhonesList()
      .then(resolve => fetchPhonesProcess(resolve))
      .catch(errorProcess);
  }, []);

  useEffect(() => {
    setIsFetching(true);
    getDetails(infoPath)
      .then(resolve => fetchDetailsProcess(resolve))
      .catch(errorProcess);
  }, [phones, location]);

  return isFetching
    ? <Loader />
    : (
      <main className="product-details-page">
        <Error isError={isError} />
        <Breadcrumbs productList={phones} />
        <BackButton />
        <h1 className="product-details-page__title">
          {productName}
        </h1>
        <div className="product-details-page__info">
          <DetailsProductGallery details={details} />
          <DetailsProductSelect
            details={details}
            phones={phones}
            currentPhone={currentPhone}
          />
          <DetailsProductAbout description={details?.description} />
          <DetailsProductSpecs details={details} />
        </div>
        <ProductsSlider
          title="You may also like"
          phones={randomPhones}
        />
      </main>
    );
};
