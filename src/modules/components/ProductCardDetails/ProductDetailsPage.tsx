/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';
import { CategoryType, ProductType } from '@/modules/shared/utils/types';

import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { Loader } from '@/modules/shared/components/Loader';
import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { BackButton } from '@/modules/shared/components/ui/BackButton';

import { ProductCardDetails } from './components/ProductCardDetails';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

import styles from './ProductDetailsPage.module.scss';
//#endregion IMPORTS

//#region STYLES
const { productDetailsPage, backBtnWrapper } = styles;
//#endregion STYLES

//#region HELPERS
const getSuggestedProducts = (
  products: ProductType[],
  currentProductId?: string,
) => {
  const filtered = products.filter(item =>
    item.itemId !== currentProductId);

  const shuffled = [...filtered].sort(() =>
    0.5 - Math.random());

  return shuffled.slice(0, 15);
};
//#endregion

export const ProductDetailsPage = () => {
  //#region ROUTING
  const { pathname } = useLocation();
  const currentCategory = pathname.split('/')[1] as CategoryType;
  const { productId } = useParams();
  //#endregion

  //#region DATA_FETCHING
  const {
    loadCategoryDetails,
    getProductDetailById,
    getProductsByCategory,
    isLoading,
    isError,
  } = useProducts();

  useEffect(() => {
    loadCategoryDetails(currentCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  const productDetails = productId
    ? getProductDetailById(productId)
    : undefined;
  //#endregion DATA_FETCHING

  //#region DATA_TRANSORFATION
  const categoryProducts = getProductsByCategory(currentCategory);
  const recommendedProducts = useMemo(() => {
    return getSuggestedProducts(categoryProducts, productId);
  }, [categoryProducts, productId]);

  const isNotFound = !isLoading && !isError && !productDetails;
  const showDetails = !isLoading && !isError && !!productDetails;
  //#endregion DATA_TRANSORFATION

  //#region RENDER
  return (
    <div className={productDetailsPage}>

      <Breadcrumbs
        pageTitle={currentCategory}
        productName={productDetails?.name}
      />

      <div className={backBtnWrapper}>
        <BackButton />
      </div>

      {/* Стан завантаження*/}
      {isLoading && <Loader />}

      {/* Стан помилки*/}
      {(isError || isNotFound) && (
        <ErrorMessage message="Product was not found" />
      )}

      {/* Стан успіху -> показуємо товар*/}
      {showDetails && (
        <>
          <ProductCardDetails product={productDetails} />

          <ProductsSlider
            title="You may also like"
            products={recommendedProducts}
          />
        </>
      )}
    </div>
  );
  //#endregion RENDER
};
