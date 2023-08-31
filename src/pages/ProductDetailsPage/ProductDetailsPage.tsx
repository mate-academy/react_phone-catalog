import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getDirectoryName } from '../../helpers/utils';
import { fetchCompleteDetails } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { ProductNotFound } from './ProductNotFound';
import { ProductDetails } from '../../components/ProductDetails';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { pathname } = useLocation();
  const { productId } = useParams();

  const directory = getDirectoryName(pathname);

  useEffect(() => {
    fetchCompleteDetails(productId || '')
      .then(setProductDetails)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <div className="ProductDetailsPage">
      <div className="container container--with-min-height">
        <div className="ProductDetailsPage__content">
          {isError ? (
            <ProductNotFound directory={directory} />
          ) : (
            <>
              <div className="ProductDetailsPage__breadcrumbs">
                <Breadcrumbs
                  productName={productDetails?.name || productId}
                />
              </div>

              <div className="ProductDetailsPage__back-button">
                <BackButton />
              </div>

              {isLoading && <Loader />}
              {productDetails && <ProductDetails details={productDetails} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
