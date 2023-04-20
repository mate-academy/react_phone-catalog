import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { BackButton } from '../components/BackButton';
import { DetailsProductGallery } from '../components/DetailsProductGallery';
import { DetailsProductSelect } from '../components/DetailsProductSelect';
import { Error } from '../components/Error';

import { Details } from '../types/Details';
import { DetailsProductAbout } from '../components/DetailsProductAbout';
import { DetailsProductSpecs } from '../components/DetailsProductSpecs';
import { ProductsSlider } from '../components/ProductsSlider';
import { randomSequence } from '../utils/detailsUtils';
import { usePhones } from '../hooks/usePhones';

export const ProductDetailsPage: React.FC = () => {
  const [details, setDetails] = useState<Details | null>(null);
  const [isErrorDetails, setIsErrorDetails] = useState(false);
  const location = useLocation();
  const { phones, isErrorPhones } = usePhones();

  const pathArray = location.pathname.slice(1).split('/');
  const productId = pathArray[1];
  const currentPhone = phones.find(phone => phone.id === productId);
  const productDetailsPath = currentPhone?.itemId;
  const productName = currentPhone?.name;
  const infoPath = `products/${productDetailsPath}.json`;
  const randomPhones = useMemo(() => randomSequence(phones), [phones]);
  const navigate = useNavigate();

  const getDetails = async (path: string): Promise<Details> => {
    const response = await fetch(path);
    const detailsData = await response.json();

    return detailsData;
  };

  const handleDetailsResolve = (api: Details) => {
    setIsErrorDetails(false);
    setDetails(api);
  };

  const handleDetailsReject = () => {
    navigate('/notFound');
  };

  useEffect(() => {
    if (phones.length) {
      getDetails(infoPath)
        .then(resolve => handleDetailsResolve(resolve))
        .catch(handleDetailsReject);
    }
  }, [phones, location]);

  return !phones.length
    ? <Loader />
    : (
      <main className="product-details-page">
        <Error isError={isErrorDetails || isErrorPhones} />
        {!isErrorDetails && !isErrorPhones && (
          <>
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
          </>
        )}
      </main>
    );
};
