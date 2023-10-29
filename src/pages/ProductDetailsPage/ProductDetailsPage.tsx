import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../utils/httpClient';
import { ProductDescription } from '../../types/ProductDescription';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../components/ProductDetails';

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDescription>();
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(String(productId))
      .then(setProductDetails)
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <div className="product-details-page">
      <div className="container">
        {isLoading && <Loader />}

        <BreadCrumbs />

        <div
          className="product-details-page__button-back"
          data-cy="backButton"
        >
          <img src="new/img/icons/arrow-left.svg" alt="arrow-back" />
          <span>Back</span>
        </div>

        <ProductDetails productDetails={productDetails} />

      </div>

    </div>
  );
};
