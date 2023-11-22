/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../utils/httpClient';
import { ProductDescription } from '../../types/ProductDescription';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../components/ProductDetails';
import { BackButton } from '../../components/BackButton';

import './productDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [productDetails, setProductDetails] = useState<ProductDescription>();
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(String(productId))
      .then(setProductDetails)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <div className="product-details-page">
      <div className="container">
        {isLoading && <Loader />}

        {error
          && (
            <>
              <div className="product-details-page__button-back">
                <BackButton />
              </div>
              <p className="product-details-page__not-found">
                Phone was not found
              </p>
            </>
          )}

        {!error
          && (
            <>
              <BreadCrumbs />
              <BackButton />

              <ProductDetails
                productDetails={productDetails}
              />
            </>
          )}
      </div>
    </div>
  );
};
