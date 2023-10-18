import './productDetails.scss';

import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductInfo } from '../../components/ProductInfo';
import { DetailedDescription } from '../../components/DetailedDescription';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import { getDetails } from '../../helpers/getProducts';

import { Product } from '../../type/product';
import { Details } from '../../type/details';
import { Loader } from '../../components/Loader';

type Props = {
  products: Product[],
};

export const ProductDetails: React.FC<Props> = ({ products }) => {
  const { productId = '' } = useParams();
  const [details, setDetails] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generalData, setGeneralData] = useState<Product | null>(null);

  const getDetailsData = useCallback(() => {
    setIsLoading(true);

    getDetails(productId)
      .then(data => setDetails({ ...data, color: ['black', 'silver', 'red'] }))
      .catch(() => setDetails(null))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const getGeneralDataProducts = useCallback(() => {
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].id === productId) {
        setGeneralData(products[i]);

        return;
      }
    }

    setGeneralData(null);
  }, [products, productId]);

  useEffect(() => {
    getGeneralDataProducts();
  }, [products, productId]);

  useEffect(() => {
    getDetailsData();
  }, [productId]);

  return (
    <section className="product-details">
      {!isLoading ? (
        <>
          <Breadcrumbs />

          <div className="product-details__buttons-container">
            <button
              data-cy="backButton"
              className="product-details__button"
              type="button"
              aria-label="go back"
              onClick={() => window.history.back()}
            />

            <button
              type="button"
              className="product-details__back-button"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          </div>

          {details && generalData && (
            <>
              <ProductInfo
                generalData={generalData}
                details={details}
              />

              <DetailedDescription
                generalData={generalData}
                details={details}
              />

              <ProductsSlider
                isLoading={isLoading}
                products={products}
                title="You may also like"
              />
            </>
          )}

          {!details && !isLoading && (
            <div className="product-details__wrapper-info">
              <NoResults category="Product" />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
