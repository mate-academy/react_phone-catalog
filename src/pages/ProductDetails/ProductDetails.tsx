import React, { useEffect } from 'react';
import './ProductDetails.scss';
import { useLocation } from 'react-router-dom';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { getHotProducts } from '../../utils/utils';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackLinkButton } from '../../components/Elements/BackLinkButton';
import { ProductInfo } from '../../components/ProductInfo';
import { Product } from '../../types/Product';
import useSliderSettings from '../../hooks/useSliderSettings';
import { useParams } from 'react-router-dom';
import { Category } from '../../types/Category';
import { useAppContext } from '../../store/store';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const {
    state: { products, selectedProduct: product },
    methods: { setSelectedProduct },
  } = useAppContext();
  const sliderSettings = useSliderSettings();

  const currentCategory = pathname.split('/')[1];
  const selectedProduct = products.find(item => item.itemId === product?.id);

  useEffect(() => {
    // console.log(product);
    setSelectedProduct(currentCategory as Category, productId);
  }, [currentCategory, productId]);

  return (
    <>
      {productId}
      {currentCategory}

      {product && (
        <div className="product-details">
          <Breadcrumbs />
          <BackLinkButton />

          <ProductInfo
            product={selectedProduct as Product}
            productInfo={product}
          />

          {products && (
            <ProductSlider
              title={'You may also like'}
              elements={getHotProducts(products)}
              settings={sliderSettings}
            />
          )}
        </div>
      )}
    </>
  );
};
