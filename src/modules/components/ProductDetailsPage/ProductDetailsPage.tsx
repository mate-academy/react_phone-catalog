/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';
import { CategoryType } from '@/modules/shared/utils/types';

import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { Loader } from '@/modules/shared/components/Loader';
import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { BackButton } from '@/modules/shared/components/BackButton';


import { ProductCardDetails } from './components/ProductCardDetails';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

import styles from './ProductDetailsPage.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  container,
} = styles;
//#endregion STYLES

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
  const recommendedProducts = categoryProducts.filter(
    product => product.itemId !== productId,
  );
  const showDetails = !isLoading && !isError && productDetails;
  //#endregion DATA_TRANSORFATION

  //#region RENDER
  return (
    <div className={container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Product was not found" />}

      <Breadcrumbs
        pageTitle={currentCategory}
        productName={productDetails?.name}
      />

      <BackButton />

      {showDetails && (
        <>
          <ProductCardDetails
            product={productDetails}
          />

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
