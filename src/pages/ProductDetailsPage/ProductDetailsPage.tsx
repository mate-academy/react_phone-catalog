import React, { useContext, useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import { useParams } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductContext } from '../../helpers/utils/productsContext';
import { Loader } from '../../components/Loader';
import { ProductDetailsMain } from '../../components/ProductDetailsMain';
import { getLocalStorageOrApi } from '../../helpers/utils/getLocalStorageOrApi';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';
import { ProductDescription } from '../../components/ProductDescription';

type Props = {};

export const ProductDetailsPage: React.FC<Props> = () => {
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const [product, setProduct] = useState<DeviceDetails>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (productId) {
      getLocalStorageOrApi<DeviceDetails>(
        productId,
        `/products/${productId}.json`,
      )
        .then(prod => setProduct(prod))
        .catch(() => setIsError(true));
    }
  }, [productId]);

  return (
    <main className="product-details">
      <div className="container">
        <div className="product-details__content">
          {product ? (
            <div>
              <ProductDetailsMain product={product} />

              <ProductDescription product={product} />
            </div>
          ) : (
            <>{isError ? <h1>Phone was not found</h1> : <Loader />}</>
          )}

          {products ? (
            <ProductsSlider title="You may also like" products={products} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </main>
  );
};
