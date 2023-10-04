import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { fetchCompleteDetails } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductNotFound } from './ProductNotFound';
import { ProductDetails } from '../../components/ProductDetails';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const directory = pathname.split('/')[1];

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
                <button
                  type="button"
                  data-cy="backButton"
                  className="BackButton"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
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
