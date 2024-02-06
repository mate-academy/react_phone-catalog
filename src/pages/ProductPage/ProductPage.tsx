import React, { memo, useCallback, useEffect, useRef } from 'react';
import BackButton from '../../components/UI/BackButton';
import { useAppParams } from '../../enhancers/hooks/appParams';
import ProductDetailsComponent from '../../components/common/ProductDetailsComponent';
import { useRequest } from '../../enhancers/hooks/request';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ProductDetails } from '../../definitions/types/ProductDetails';
import { useNavigate } from 'react-router-dom';

import './ProductPage.scss';
import { getProductDetailsById, getVariantsOfProduct } from '../../api/products/client/productsDetails';
import ProductsCarouselWithRandomItems from '../../components/common/ProductsCarousel/ProductsCarouselWithRandomItems';

export const ProductPage: React.FC = memo(() => {
  const { productId, category } = useAppParams();
  const navigate = useNavigate();
  const [product, , error, setProduct] = useRequest(
    () => getProductDetailsById(productId, category), [], null
  );
  const similarProducts = useRef<ProductDetails[]>([]);

  const changeProduct = useCallback((color: string, capacity: string) => {
    const productToChange = similarProducts.current.find(currentProduct => (
      currentProduct.color === color && currentProduct.capacity === capacity
    ));

    if (productToChange) {
      navigate(`/${category}/${productToChange.id}`);
      setProduct(productToChange);
    }
  }, [similarProducts])

  useEffect(() => {
    if (product) {
      getVariantsOfProduct(product, category).then((products) => {
        similarProducts.current = products;
      })
    }
  }, [product?.namespaceId]);


  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="product-page">
      <BackButton className='product-page__back-button' />

      <div className="product-page__content">
        <ProductDetailsComponent product={product} changeProduct={changeProduct} />

        <ProductsCarouselWithRandomItems name='You may also like' />
      </div>
    </div>
  );
});
