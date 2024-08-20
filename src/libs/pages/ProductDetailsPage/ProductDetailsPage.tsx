import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import * as productDetailsActions from '../../slices/productDetailsSlice';
import * as suggestedProductsActions from '../../slices/suggestedProductsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  Breadcrumbs,
  SectionHeader,
  BackButton,
  Loader,
  ProductsSlider,
  ErrorMessage,
  ProductImagesSection,
  ProductInfoSection,
  ProductDescriptionSection,
  ProductSpecsSection,
} from '../../components';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const productId = pathname.split('/').slice(-1)[0];
  const dispatch = useAppDispatch();
  const {
    selectedProductDetails,
    selectedProduct,
    loaded: productDetailsLoaded,
    hasError: hasProductDetailsError,
  } = useAppSelector(state => state.productDetails);
  const { allProducts } = useAppSelector(state => state.products);
  const {
    suggestedProducts,
    hasError: hasSuggestedProductsError,
    loaded: suggestedProductsLoaded,
  } = useAppSelector(state => state.suggestedProducts);

  const hasLoader =
    (!productDetailsLoaded && !hasProductDetailsError) ||
    (!suggestedProductsLoaded && !hasSuggestedProductsError) ||
    !allProducts.length;

  const hasInfo =
    productDetailsLoaded &&
    !hasProductDetailsError &&
    suggestedProductsLoaded &&
    !hasSuggestedProductsError &&
    !!suggestedProducts.length &&
    !!selectedProduct &&
    !!selectedProductDetails;

  const hasError =
    (hasProductDetailsError && productDetailsLoaded) ||
    (!hasLoader &&
      !selectedProduct &&
      !selectedProductDetails &&
      !!allProducts.length);

  useEffect(() => {
    if (allProducts.length) {
      dispatch(productDetailsActions.fetchProductDetails({ id: productId }));
    }
  }, [dispatch, productId, allProducts]);

  useEffect(() => {
    dispatch(suggestedProductsActions.fetchSuggestedProducts());
  }, [dispatch, productId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedProduct]);

  useEffect(
    () => () => {
      dispatch(productDetailsActions.resetStore());
    },
    [dispatch],
  );

  return (
    <div className="product-page">
      <Breadcrumbs classNames="product-page__small-nav" />

      {hasLoader && <Loader />}

      {hasInfo && (
        <>
          <BackButton classNames="product-page__back-button" />
          <SectionHeader
            title={selectedProductDetails.name}
            classNames="product-page__title"
          />

          <div className="product-page__basic-info">
            <ProductImagesSection productDetails={selectedProductDetails} />

            <ProductInfoSection
              product={selectedProduct}
              productDetails={selectedProductDetails}
            />
          </div>

          <div className="product-page__detailed-info">
            <ProductDescriptionSection
              productDetails={selectedProductDetails}
            />

            <ProductSpecsSection productDetails={selectedProductDetails} />
          </div>

          <ProductsSlider items={suggestedProducts} title="You may also like" />
        </>
      )}

      {hasError && <ErrorMessage title="Product was not found" />}
    </div>
  );
};
