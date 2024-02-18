import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

import { Product } from '../../types/Product';
import { PhoneDetails } from '../../types/Phone';

import { getAllProducts, getPhoneDetails } from '../../helpers/FetchProducts';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const productAdress = pathname.split('/').filter((item) => item !== '');
  const productId = productAdress[productAdress.length - 1];

  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const phoneDetails = await getPhoneDetails(productId || '');

        if (!phoneDetails) {
          setError('Product details were not found...');

          return;
        }

        setDetails(phoneDetails);
        setCurrentImage(phoneDetails.images[0]);

        const phones = await getAllProducts();
        const phoneInfo = phones.find(
          (phone) => phone.phoneId === phoneDetails.id,
        );

        if (!phoneInfo) {
          setError('Could not find exact product...');

          return;
        }

        setProductInfo(phoneInfo);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="product-details">
      <div className="product-details__navigation" data-cy="breadCrumbs">
        <BreadCrumbs productName={details?.name || '???'} />
      </div>

      <section className="details-page__back-button">
        <BackButton />
      </section>

      {!details || !productInfo || error ? (
        <div className="details-page__error">
          <h1 className="details-page__error-title">{error}</h1>
          <p className="details-page__error-description">
            Something went wrong...
          </p>
        </div>
      ) : (
        <>
          <section className="details-page__section
            details-page__section--small">
            <h1 className="details-page__title">{details.name}</h1>
          </section>
        </>
      )}

      <img src={currentImage} alt="Product" />
    </section>
  );
};
