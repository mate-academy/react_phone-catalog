import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { WarningMessage } from '../components/WarningMessage';
import { ProductDetails } from '../components/ProductDetails';
import { ProductsContext } from '../store/ProductsContext';
import { BackBtn } from '../components/BackBtn';
import { Breadcrumbs } from '../components/Breadcrumbs';

import { getProductById } from '../utils/api';

import { ProductDetails as DetailsType } from '../types/ProductDetails';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const selectedProductId = useMemo(
    () => productId?.slice(1) || '',
    [productId],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [productDetails, setProductDetails] = useState<DetailsType | null>(
    null,
  );
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!loading && products.length > 0 && selectedProductId) {
      getProductById(selectedProductId)
        .then((fetchedDetails: DetailsType) => {
          const currentProduct = products.find(
            product => product.itemId === selectedProductId,
          );

          const priceRegular = currentProduct ? currentProduct.fullPrice : null;
          const priceDiscount = currentProduct ? currentProduct.price : 0;

          const updatedDetails = {
            ...fetchedDetails,
            priceRegular,
            priceDiscount,
          };

          setProductDetails(updatedDetails);
        })
        .catch(() => setError('Failed to get product'))
        .finally(() => {
          setIsLoading(false);
          setIsFetched(true);
        });
    }
  }, [selectedProductId, loading, products]);

  const isError = error && !isLoading;
  // prettier-ignore
  const isProductNotFound = !error
    && !isLoading
    && !productDetails
    && !productDetails
    && isFetched;

  const isProductFound = !error && !isLoading && isFetched && productDetails;

  return (
    <div className="Main__productDetailsPage">
      <div className="Main__breadcrumbs">
        <Breadcrumbs />
      </div>
      <div className="Main__backBtn">
        <BackBtn />
      </div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error} />}
      {isProductNotFound && <WarningMessage message="Product was not found" />}
      {isProductFound && <ProductDetails details={productDetails} />}
    </div>
  );
};
