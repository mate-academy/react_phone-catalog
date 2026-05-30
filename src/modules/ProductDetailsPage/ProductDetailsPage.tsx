import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Category, DetailedProduct, Product, ThemeType } from '../../types';
import { getDetailedProductsByCategory, getProducts } from '../../services';
import { getSuggestedProducts } from '../../utils';
import { useTheme, useLoadData } from '../../hooks';

import {
  Breadcrumbs,
  BackButton,
  ProductsSlider,
  ProductsSliderSkeleton,
  InfoMessage,
} from '../../components';
import {
  Controls,
  ControlsSkeleton,
  About,
  AboutSkeleton,
  TechSpecs,
  TechSpecsSkeleton,
  PhotoGallery,
  PhotoGallerySkeleton,
  ProductNotFound,
} from './components';

import errorImgLight from '../../assets/loading-error-light.png';
import errorImgDark from '../../assets/loading-error-dark.png';

import styles from './ProductDetailsPage.module.scss';

type Props = {
  productsCategory: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ productsCategory }) => {
  const { productId } = useParams();
  const { theme } = useTheme();

  const {
    data: allProducts = [],
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
    refetch: refetchAll,
  } = useLoadData<Product[]>(getProducts, []);

  const loadDetailedProducts = useCallback(
    () => getDetailedProductsByCategory(productsCategory),
    [productsCategory],
  );

  const {
    data: detailedProducts = [],
    isLoading: isDetailedLoading,
    isError: isDetailedError,
    refetch: refetchDetailed,
  } = useLoadData<DetailedProduct[]>(loadDetailedProducts, [productsCategory]);

  const selectedProduct = useMemo(() => {
    return detailedProducts?.find(product => product.id === productId) || null;
  }, [productId, detailedProducts]);

  const detailedProductsSameModel = useMemo(() => {
    return (
      detailedProducts?.filter(
        product => product.namespaceId === selectedProduct?.namespaceId,
      ) || []
    );
  }, [selectedProduct, detailedProducts]);

  const suggestedProducts = getSuggestedProducts(allProducts || [], 16);

  const isError = isAllProductsError || isDetailedError;

  const renderErrorMessage = () => (
    <InfoMessage
      title="Oops! Something went wrong while loading product details."
      buttonText="Try Again"
      onButtonClick={() => {
        refetchAll();
        refetchDetailed();
      }}
      image={theme === ThemeType.Light ? errorImgLight : errorImgDark}
      className={styles['product-details__message']}
    />
  );

  const renderLoadingState = () => (
    <>
      <Breadcrumbs className={styles['product-details__breadcrumbs']} />
      <section className={styles['product-details__content']}>
        <BackButton className={styles['product-details__back-button']} />
        <h2
          className={`${styles['product-details__title']} ${styles['product-details__title--loading']}`}
        />
        <div className={styles['product-details__main']}>
          <PhotoGallerySkeleton
            className={styles['product-details__gallery']}
          />
          <ControlsSkeleton className={styles['product-details__controls']} />
          <AboutSkeleton className={styles['product-details__about']} />
          <TechSpecsSkeleton className={styles['product-details__specs']} />
        </div>
      </section>
      {isAllProductsLoading ? (
        <ProductsSliderSkeleton
          title="You may also like"
          className={styles['product-details__slider']}
        />
      ) : (
        <ProductsSlider
          products={suggestedProducts}
          title="You may also like"
          className={styles['product-details__slider']}
        />
      )}
    </>
  );

  const renderProductDetails = () => (
    <>
      <Breadcrumbs className={styles['product-details__breadcrumbs']} />
      <section className={styles['product-details__content']}>
        <BackButton className={styles['product-details__back-button']} />
        <h2 className={styles['product-details__title']}>
          {selectedProduct?.name}
        </h2>
        <div className={styles['product-details__main']}>
          <PhotoGallery
            productName={selectedProduct?.name || ''}
            images={selectedProduct?.images || []}
            className={styles['product-details__gallery']}
          />
          <Controls
            className={styles['product-details__controls']}
            product={selectedProduct as DetailedProduct}
            productsCategory={productsCategory}
            detailedProductsSameModel={detailedProductsSameModel}
          />
          <About
            product={selectedProduct as DetailedProduct}
            className={styles['product-details__about']}
          />
          <TechSpecs
            product={selectedProduct as DetailedProduct}
            className={styles['product-details__specs']}
          />
        </div>
      </section>
      {isAllProductsLoading ? (
        <ProductsSliderSkeleton
          title="You may also like"
          className={styles['product-details__slider']}
        />
      ) : (
        <ProductsSlider
          products={suggestedProducts}
          title="You may also like"
          className={styles['product-details__slider']}
        />
      )}
    </>
  );

  const renderProductNotFound = () => (
    <ProductNotFound className={styles['product-details__not-found']} />
  );

  return (
    <main className={styles['product-details']}>
      {isError && renderErrorMessage()}
      {isDetailedLoading && renderLoadingState()}
      {!selectedProduct && !isDetailedLoading && renderProductNotFound()}
      {selectedProduct && !isDetailedLoading && renderProductDetails()}
    </main>
  );
};
