/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ButtonIcon } from '../elements/ButtonIcon/ButtonIcon';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { ProductSlider, Slide } from '../components/ProductSlider/ProductSlider';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Loader } from '../elements/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSelectedProduct } from '../features/selectedProductSlice';

export const ProductDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, isLoading } = useAppSelector(state => state.selectedProduct);
  const { products } = useAppSelector(state => state.products);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSelectedProduct(productId || null));
  }, [productId, dispatch]);

  if (!selectedProduct) {
    return <p>product not found</p>;
  }

  return (
    <div className="page">
      <Breadcrumbs page="phones" product={selectedProduct} />

      <div className="page__backBtn">
        <ButtonIcon
          type="link"
          shape="left"
          path=".."
          text="Back"
          dynamicClasses={['no-border']}
          backBtn
          disactive
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
