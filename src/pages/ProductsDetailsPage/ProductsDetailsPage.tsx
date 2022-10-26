/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { requestDetails } from '../../helpers/getProductDetails';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsDetails } from '../../components/ProductsDetails';

import './ProductsDetailsPage.scss';

type Props = {
  parentPath: string;
};

export const ProductsDetailsPage: React.FC<Props> = ({
  parentPath,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct]
    = useState<ProductDetails | null>(null);
  const { productId = '' } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    requestDetails(productId)
      .then(prod => {
        setSelectedProduct(prod);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="category-page">
            <div
              data-cy="breadCrumbs"
              className="category-page__status status"
            >
              <Link
                to="/"
                className="status__home-logo"
              >
                <img
                  src="img/icons/home.svg"
                  alt="home"
                />
              </Link>

              <img
                src="img/icons/next-arrow-disabled.svg"
                alt="arrow"
                className="status__arrow"
              />

              <Link
                to={`../${parentPath.toLowerCase()}`}
                className="status__parent-title"
              >
                {parentPath}
              </Link>

              <img
                src="img/icons/next-arrow-disabled.svg"
                alt="arrow"
                className="status__arrow"
              />

              <p className="status__title">{selectedProduct?.name}</p>
            </div>

            <div
              data-cy="backButton"
              className="category-page__back"
              onClick={() => window.history.back()}
            >
              <img
                src="img/icons/prev-arrow.svg"
                alt="back-arrow"
              />

              <p className="status__title">Back</p>
            </div>
          </div>

          <div
            className="products-details-page products-details-page__container"
          >
            <ProductsDetails selectedProduct={selectedProduct} />
          </div>
        </>

      )}
    </>
  );
};
