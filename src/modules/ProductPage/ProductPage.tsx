import React, { useEffect } from 'react';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';
import { generateDeviceModel } from '../../helpers/generateDeviceModel';
import { useAppSelector } from '../../hooks/hooks';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Breadcrumbs } from '../Breadcrumbs';
import { BackButton } from '../shared/atoms/BackButton';
import { Typography } from '../shared/atoms/Typography';
import { PageLoader } from '../shared/molecules/PageLoader';
import { RetryErrorMessage } from '../shared/organisms/RetryErrorMessage';
import { ProductRecommendations } from './components/organisms/ProductRecommendations';
import { ProductFullSpecs } from './components/organisms/ProductFullSpecs';
import { ProductDescription } from './components/organisms/ProductDescription';
import { ProductInfoSection } from './components/organisms/ProductInfoSection';
import { ProductGallery } from './components/organisms/ProductGallery';
import { PageMessage } from '../shared/molecules/PageMessage';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();

  const { products, error } = useAppSelector(state => state.products);

  const selectedProduct = products.find(
    product => product.itemId === productId,
  ) as Product;

  const categoryState = useAppSelector(
    state => state[selectedProduct?.category],
  );

  const productDetails = categoryState?.productList?.find(
    product => product.id === productId,
  ) as ProductDetails;

  const productModel = generateDeviceModel(productId!);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (error) {
    <RetryErrorMessage />;
  }

  if (!selectedProduct || !productDetails) {
    return <PageLoader />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <BackButton className={styles.page__back} />
      <Typography tag="h2" variant="h2" className={styles.title}>
        {productDetails?.name} ({productModel})
      </Typography>

      {!productDetails ? (
        <PageMessage title={'Product not found'} />
      ) : (
        <div className={styles.product}>
          <ProductGallery productDetails={productDetails} />

          <ProductInfoSection
            productDetails={productDetails}
            selectedProduct={selectedProduct}
          />

          <ProductDescription productDetails={productDetails} />

          <ProductFullSpecs
            productDetails={productDetails}
            selectedCategory={selectedProduct?.category}
          />

          <ProductRecommendations />
        </div>
      )}
    </div>
  );
};
