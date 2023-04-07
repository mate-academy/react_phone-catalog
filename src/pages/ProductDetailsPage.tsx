import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPhonesList } from '../api';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { BackButton } from '../components/BackButton';
import { DetailsProductGallery } from '../components/DetailsProductGallery';
import { DetailsProductSelect } from '../components/DetailsProductSelect';

import { Phone } from '../types/Phone';
import { Details } from '../types/Details';
import { DetailsProductAbout } from '../components/DetailsProductAbout';
import { DetailsProductSpecs } from '../components/DetailsProductSpecs';
import { ProductSlider } from '../components/ProductsSlider';
import { randomSequence } from '../utils/detailsUtils';

export const ProductDetailsPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [details, setDetails] = useState<Details | null>(null);
  const location = useLocation();

  const pathArray = location.pathname.slice(1).split('/');
  const productId = pathArray[1];
  const currentPhone = phones.find(phone => phone.id === productId);
  const productDetailsPath = currentPhone?.itemId;
  const productName = currentPhone?.name;
  const publicPath = process.env.PUBLIC_URL;
  const infoPath = `${publicPath}/_new/products/${productDetailsPath}.json`;

  const getDetails = async (path: string): Promise<Details> => {
    const response = await fetch(path);
    const detailsData = await response.json();

    return detailsData;
  };

  useEffect(() => {
    getPhonesList()
      .then(resolve => setPhones(resolve))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    getDetails(infoPath)
      .then(resolve => setDetails(resolve))
      .catch(error => console.log(error));
  }, [phones, location]);

  return !details
    ? <Loader />
    : (
      <div className="product-details-page">
        <Breadcrumbs phones={phones} />
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
          <DetailsProductAbout description={details.description} />
          <DetailsProductSpecs details={details} />
        </div>
        <ProductSlider
          title="You may also like"
          phones={randomSequence(phones)}
        />
      </div>
    );
};
