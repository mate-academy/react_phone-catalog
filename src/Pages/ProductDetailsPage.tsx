/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsContext } from '../store/ProductsContext';
import { getProductDetails } from '../helpers/utils/api';
import { ButtonIcon } from '../elements/ButtonIcon/ButtonIcon';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { ProductSlider, Slide } from '../components/ProductSlider/ProductSlider';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Loader } from '../elements/Loader/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { selectedProduct, setSelectedProduct, products } = useContext(ProductsContext);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(productId || null)
      .then(setSelectedProduct)
      .finally(() => setIsLoading(false));
  }, [productId, setSelectedProduct]);

  if (!selectedProduct) {
    return <p>product not found</p>;
  }

  return (
    <div className="page">
      <Breadcrumbs page="phones" product={selectedProduct} />

      <div className="page__backBtn">
        <ButtonIcon
          type="link"
          shape="left-light"
          path="/"
          text="Back"
          dynamicClasses={['no-border']}
          backBtn
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductDetails product={selectedProduct} />

          <div className="page__section page__section--suggest">
            <ProductSlider title="You may also like">
              {products.map(prod => (
                <Slide key={prod.id}>
                  <ProductCard product={prod} />
                </Slide>
              ))}
            </ProductSlider>
          </div>
        </>
      )}
    </div>
  );
};
