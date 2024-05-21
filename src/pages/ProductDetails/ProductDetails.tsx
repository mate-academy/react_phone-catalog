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
import { ProductDetailsSkeleton } from './components/PageSkeleton';

export const ProductDetails: React.FC = () => {
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const {
    state: { isLoading, products, selectedProduct: product },
    methods: { setSelectedProduct, removeSelectedProduct },
  } = useAppContext();

  const sliderSettings = useSliderSettings();

  const category = pathname.split('/')[1];
  const selectedProduct = products.find(item => item.itemId === product?.id);

  useEffect(() => {
    setSelectedProduct(category as Category, productId);

    return () => removeSelectedProduct();

    // eslint-disable-next-line
  }, [category, productId, setSelectedProduct]);

  return !isLoading && product ? (
    <div className="product-details">
      <div className="product-details__links">
        <Breadcrumbs />
        <BackLinkButton />
      </div>

      <ProductInfo product={selectedProduct as Product} productInfo={product} />

      <ProductSlider
        title={'You may also like'}
        elements={getHotProducts(products)}
        settings={sliderSettings}
      />
    </div>
  ) : (
    <ProductDetailsSkeleton />
  );
};
